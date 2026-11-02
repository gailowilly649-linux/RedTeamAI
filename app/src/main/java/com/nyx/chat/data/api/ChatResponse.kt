package com.nyx.chat.data.api

import com.google.gson.annotations.SerializedName

data class ChatResponse(
    val id: String,
    val `object`: String,
    val choices: List<Choice>,
    val usage: Usage?
)

data class Choice(
    val index: Int,
    val message: ResponseMessage,
    @SerializedName("finish_reason")
    val finishReason: String?
)

data class ResponseMessage(
    val role: String,
    val content: String?,
    @SerializedName("reasoning_content")
    val reasoningContent: String? = null
) {
    /** Returns the primary message content, falling back to reasoning_content if content is null */
    fun getEffectiveContent(): String {
        return content?.takeIf { it.isNotBlank() }
            ?: reasoningContent?.takeIf { it.isNotBlank() }
            ?: "..."
    }
}

data class Usage(
    @SerializedName("prompt_tokens")
    val promptTokens: Int,
    @SerializedName("completion_tokens")
    val completionTokens: Int,
    @SerializedName("total_tokens")
    val totalTokens: Int
)
