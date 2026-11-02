package com.nyx.chat.ui.screens.chat

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.nyx.chat.data.api.AiProvider
import com.nyx.chat.data.local.MessageEntity
import com.nyx.chat.data.repository.ChatRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import java.util.concurrent.ConcurrentHashMap
import javax.inject.Inject

data class ChatUiState(
    val inputText: String  = "",
    val isLoading: Boolean = false,
    val error: String?     = null,
    val provider: AiProvider = AiProvider.NVIDIA_FREE
)

@HiltViewModel
class ChatViewModel @Inject constructor(
    private val repository: ChatRepository,
    @ApplicationContext private val context: Context? = null
) : ViewModel() {

    private val _uiState = MutableStateFlow(ChatUiState(provider = loadProvider()))
    val uiState: StateFlow<ChatUiState> = _uiState.asStateFlow()

    private val messagesCache = ConcurrentHashMap<String, StateFlow<List<MessageEntity>>>()

    fun getMessages(conversationId: String): StateFlow<List<MessageEntity>> {
        return messagesCache.getOrPut(conversationId) {
            repository.observeMessages(conversationId)
                // Eagerly keeps the flow alive even during loading/recomposition —
                // WhileSubscribed(5_000) was causing messages to wipe mid-request.
                .stateIn(viewModelScope, SharingStarted.Eagerly, emptyList())
        }
    }

    fun onInputChanged(text: String) = _uiState.update { it.copy(inputText = text) }

    fun sendMessage(conversationId: String) {
        val text = _uiState.value.inputText.trim()
        if (text.isEmpty() || _uiState.value.isLoading) return

        val provider = AiProvider.NVIDIA_FREE
        _uiState.update { it.copy(inputText = "", isLoading = true, error = null, provider = provider) }

        viewModelScope.launch {
            repository.sendMessage(conversationId, text, provider)
                .fold(
                    onSuccess = { _uiState.update { it.copy(isLoading = false) } },
                    onFailure = { e -> _uiState.update { it.copy(isLoading = false, error = e.message) } }
                )
        }
    }

    fun clearError() = _uiState.update { it.copy(error = null) }

    fun refreshProvider() {
        val prov = loadProvider()
        _uiState.update { it.copy(provider = prov) }
    }

    // ── Prefs helpers ────────────────────────────────────────────────────────
    private fun prefs() = context?.getSharedPreferences("redteam_prefs", Context.MODE_PRIVATE)

    private fun getApiKey(provider: AiProvider): String? {
        val savedKey = prefs()?.getString("api_key_${provider.name}", null)
            ?: (if (provider.name == prefs()?.getString("provider", null)) prefs()?.getString("api_key", null) else null)
        return savedKey?.takeIf { it.isNotBlank() }
    }

    private fun loadProvider(): AiProvider {
        val provName = prefs()?.getString("provider", AiProvider.NVIDIA_FREE.name) ?: AiProvider.NVIDIA_FREE.name
        return AiProvider.fromName(provName)
    }
}
