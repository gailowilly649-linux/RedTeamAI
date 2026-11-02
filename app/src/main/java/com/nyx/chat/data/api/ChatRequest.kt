package com.nyx.chat.data.api

import com.google.gson.annotations.SerializedName

data class ChatRequest(
    val model: String,
    val messages: List<Message>,
    val temperature: Double = 1.0,
    @SerializedName("top_p")
    val topP: Double = 0.95,
    @SerializedName("max_tokens")
    val maxTokens: Int = 8192,
    val stream: Boolean = false
)

data class Message(
    val role: String,           // system | user | assistant
    val content: String
)
