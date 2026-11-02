package com.nyx.chat.ui.screens.chat

import com.nyx.chat.data.local.ConversationDao
import com.nyx.chat.data.local.ConversationEntity
import com.nyx.chat.data.local.MessageDao
import com.nyx.chat.data.local.MessageEntity
import com.nyx.chat.data.repository.ChatRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotSame
import org.junit.Before
import org.junit.Test

@OptIn(ExperimentalCoroutinesApi::class)
class ChatViewModelTest {

    private val testDispatcher = StandardTestDispatcher()

    @Before
    fun setUp() {
        Dispatchers.setMain(testDispatcher)
    }

    @After
    fun tearDown() {
        Dispatchers.resetMain()
    }

    private class FakeConversationDao : ConversationDao {
        override fun observeAll(): Flow<List<ConversationEntity>> = MutableStateFlow(emptyList())
        override suspend fun getById(id: String): ConversationEntity? = null
        override suspend fun upsert(conversation: ConversationEntity) {}
        override suspend fun delete(conversation: ConversationEntity) {}
        override suspend fun deleteById(id: String) {}
    }

    private class FakeMessageDao : MessageDao {
        override suspend fun insert(message: MessageEntity) {}
        override fun observeByConversation(conversationId: String): Flow<List<MessageEntity>> = MutableStateFlow(emptyList())
        override suspend fun getByConversation(conversationId: String): List<MessageEntity> = emptyList()
        override suspend fun deleteByConversation(conversationId: String) {}
    }

    private class FakeChatRepository : ChatRepository(FakeConversationDao(), FakeMessageDao()) {
        val conversationMap = mutableMapOf<String, MutableStateFlow<List<MessageEntity>>>()

        override fun observeMessages(conversationId: String): MutableStateFlow<List<MessageEntity>> {
            return conversationMap.getOrPut(conversationId) {
                MutableStateFlow(emptyList())
            }
        }
    }

    @Test
    fun getMessages_returnsDistinctFlowsPerConversationId() = runTest {
        val fakeRepo = FakeChatRepository()
        val viewModel = ChatViewModel(fakeRepo)

        val flow1 = viewModel.getMessages("conv-1")
        val flow2 = viewModel.getMessages("conv-2")

        assertNotSame(flow1, flow2)
    }

    @Test
    fun onInputChanged_updatesInputTextInUiState() = runTest {
        val fakeRepo = FakeChatRepository()
        val viewModel = ChatViewModel(fakeRepo)

        viewModel.onInputChanged("Hello Red Team AI")
        assertEquals("Hello Red Team AI", viewModel.uiState.value.inputText)
    }

    @Test
    fun clearError_clearsErrorFromUiState() = runTest {
        val fakeRepo = FakeChatRepository()
        val viewModel = ChatViewModel(fakeRepo)

        viewModel.clearError()
        assertEquals(null, viewModel.uiState.value.error)
    }
}
