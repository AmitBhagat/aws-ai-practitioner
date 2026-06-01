# 🏢 Foundation Models & Large Language Models (LLMs)

Generative AI is changing how we build software. Under the hood, these capabilities are powered by large neural networks trained on massive amounts of data.

---

## 1. 🎓 Foundation Models vs. LLMs

*   **Foundation Models (FMs):** High-capacity neural networks pre-trained on massive, diverse datasets using self-supervised learning at scale. They possess general-purpose language, visual, and reasoning capabilities that can be subsequently adapted to specialized down-stream tasks.  <br /> 🔍 **Example:** Amazon Titan Multimodal, which is pre-trained on millions of image-text pairs. It can search images, describe scenes, or generate text, and it can be adapted to represent local business catalogs.
*   **Large Language Models (LLMs):** A specific type of foundation model containing billions of parameters, pre-trained on text corpora to predict the next word (token) in a sequence.  <br /> 🔍 **Example:** Anthropic Claude 3 Sonnet on Amazon Bedrock. It processes prompts to generate emails, summarize contracts, or write code by predicting the most statistically likely next token.

### 🖼️ Exam Scenario: Selecting and Customizing Amazon Bedrock Models
An enterprise wants to deploy a generative AI solution using Amazon Bedrock to support multiple business units, directly reflecting Question 7, Question 19, and Question 43 in our practice quiz:
*   **Choosing the Base Model:** Instead of training a model from scratch, which requires high capital expenditure and data collections, they leverage a pre-trained **Foundation Model** (Transfer Learning) on Bedrock to adapt to related tasks (Question 7).
*   **Domain Alignment via RAG:** For their customer support desk, they require the model to answer queries about product manuals. To do this cost-effectively and prevent hallucinations, they upload the PDF manuals to an Amazon Bedrock Knowledge Base to inject text chunks into the prompt context (Question 47).
*   **Style Customization via Fine-Tuning:** For their marketing team, they require a highly customized model that generates promotional copy in a strict brand voice. They choose to **Fine-Tune** an Amazon Bedrock base model by uploading a structured dataset of labeled prompt-completion pairs in JSONL format to S3 (Question 19).
*   **Production Deployment:** Once the fine-tuning training job finishes, the team is required to purchase **Provisioned Throughput** (allocating Model Units) to serve inference queries on their customized model, since custom fine-tuned models cannot be invoked on a pay-as-you-go On-Demand basis (Question 43).

---

## 2. 🔀 Inside the Transformer Architecture

Modern LLMs are built on the **Transformer Architecture**, first introduced in Google's seminal 2017 research paper *"Attention Is All You Need"*. This replaced recurrent neural networks (RNNs) and convolutional neural networks (CNNs) for natural language processing.

> [!NOTE]
> **Transformer Parallelization:** This is a bit of a headache, but here is the trick: RNNs processed words sequentially (word-by-word), which caused memory loss over long sequences and prevented parallel processing. In contrast, Transformers process all tokens in parallel, using Positional Encodings to track word order. This unlocks massive training scalability on GPU clusters.

Here is how text routes through a Transformer:

1.  **Tokenization & Vocabulary:** Converts raw text strings into numerical IDs, which are mapped to high-dimensional embedding vectors.
    *   **Vocabulary Size:** An LLM's internal dictionary of recognized tokens, typically ranging from $30,000$ to over $100,000$ unique tokens.
    *   **Tokenization Algorithms:**
        *   *Byte Pair Encoding (BPE):* Used by GPT-3. Consolidates frequent character pairs iteratively.
        *   *WordPiece:* Used by BERT. Merges character sequences based on corpus likelihood maximization.
        *   *SentencePiece:* Used by GPT-3.5 and T5. Treats the input as a raw byte stream, making it language-independent and omitting the need for pre-segmenting whitespace.  <br /> 🔍 **Example:** The word `"unbelievable"` is processed by a Byte-Pair Encoding tokenizer and split into three sub-word tokens: `["un", "believ", "able"]`. These tokens are mapped to vocabulary integers, including `[421, 8912, 104]`, and then converted to high-dimensional embedding vectors.
2.  **Positional Encoding:** Adds order information to the vectors using sine and cosine waves:
```math
PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)
```
```math
PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)
```
    This ensures the model knows the difference between "dog bites man" and "man bites dog."  <br /> 🔍 **Example:** In the sentences `"Not good, but bad"` and `"Bad, but not good"`. Positional wave values are added to the token embeddings. The token `"not"` receives different coordinates in each sentence, preventing the model from confusing the two meanings.
3.  **Multi-Head Attention:** Calculates the relative importance and context of words in a sequence. The model maps tokens to **Queries ($Q$)**, **Keys ($K$)**, and **Values ($V$)** (similar to a database lookup system).
    *   **Self-Attention:** Computes attention weights within the same sequence:
```math
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
```  <br /> 🔍 **Example:** Processing `"The animal did not cross the street because it was tired"`. The self-attention block projects the token `"it"` into $Q$, and projects `"animal"` and `"street"` into $K$. The dot product $\frac{QK^T}{\sqrt{d_k}}$ yields a high attention score between `"it"` and `"animal"`, letting the model link the pronoun to the correct subject.
    *   **Cross-Attention:** Computes attention weights between two different sequences (e.g., mapping an English input sequence from the encoder to a Spanish output sequence in the decoder during translation).  <br /> 🔍 **Example:** Translating English to Spanish. The encoder processes `"The red house"` bidirectionally. During generation, the decoder's cross-attention block queries the encoder's output representations for `"house"` and `"red"` to output `"La casa roja"`, matching Spanish grammatical ordering rules.
    *   **Multi-Head:** Executes multiple attention mechanisms in parallel. Each head projects $Q, K, V$ into smaller subspaces, allowing the model to simultaneously focus on different syntactic and semantic relationships (e.g., one head tracks pronoun agreements, while another tracks verb-noun relationships).

---

## 3. ⚠️ Token Resource Dynamics & Context Limits

Each active token in a sequence consumes GPU memory (VRAM) and requires additional matrix calculations. Because self-attention evaluates all tokens against all other tokens, memory and compute requirements scale quadratically:
```math
\mathcal{O}(N^2)
```
where $N$ represents the sequence length. If you double your prompt length, the hardware requirements increase fourfold.  <br /> 🔍 **Example:** Processing a $1,000$-token prompt requires 1 million attention score comparisons ($1000^2$). If the prompt length increases to $10,000$ tokens, the calculations grow to 100 million comparisons ($10000^2$), requiring substantial GPU VRAM.


> [!IMPORTANT]
> **Combined Context Limits:** AWS services charge or limit usage based on combined input + output tokens. If you pass a massive input prompt (e.g., in a RAG pipeline), you limit the remaining tokens available for generating the output response.  <br /> 🔍 **Example:** If a model has a combined limit of $4096$ tokens, and your RAG prompt uses $3800$ tokens, the model can generate a maximum of $296$ output tokens before failing, regardless of the output length you request.

---

## 4. 🛠️ Model Customization & Optimization

To build, align, and run foundation models efficiently, developers guide them through several training and optimization stages:

*   **Pre-training:** Self-supervised training on massive web text datasets to predict the next token.  <br /> 🔍 **Example:** Feeding a model 1 trillion words from web pages, books, and code repositories to teach it grammar patterns and general facts about the world.
*   **Model Fine-Tuning:** Retraining all of a pre-trained model's parameter weights on a smaller, domain-specific dataset.  <br /> 🔍 **Example:** Retraining Llama 3 on medical diagnostic charts to align its outputs for clinical QA.
> [!WARNING]
> **Fine-Tuning Gotcha:** Catastrophic Forgetting. If you fine-tune a model on a narrow task without keeping a balanced dataset, it will lose its general reasoning abilities (e.g., a medical model forgetting basic math).
*   **Single-Layer Fine-Tuning (Freezing):** Freezing all layers of the pre-trained network except for the final output layer, and only updating the parameters of that final layer.  <br /> 🔍 **Example:** Training a sentiment classifier by freezing the entire Transformer backbone and only updating the weights of the final classification projection layer.
> [!NOTE]
> **Freezing Trick:** This is a bit of a headache, but here is the trick: freezing the backbone parameters is highly cost-effective because you only compute gradients for the final layer, reducing GPU VRAM usage. It also acts as a shield against catastrophic forgetting by preserving the original pre-trained representations.
*   **Model Pruning:** Removing unnecessary parameters (connections or neurons) to make the model smaller and faster with minimal loss of accuracy.
    *   **Train-time Pruning:** Encouraging the model to drop connections during the training phase (e.g., using L1 regularization to drive weights to zero).
    *   **Post-training Pruning:** Modifying the weights file directly after training is complete, identifying and zeroing out low-value parameters.  <br /> 🔍 **Example:** Deleting $20\%$ of the weights that are close to $0.0$, compressing the model file size from $10\text{ GB}$ to $8\text{ GB}$ to allow deployment on consumer edge devices.
> [!WARNING]
> **Pruning Gotcha:** Sparse matrix slowdown. If you prune weights randomly, you create sparse matrices. Unless your target hardware has specialized kernels optimized for sparse matrix math, a sparse model can actually run *slower* than its dense counterpart.
*   **RLHF (Reinforcement Learning from Human Feedback):** Aligning model outputs with human preferences regarding helpfulness and safety.  <br /> 🔍 **Example:** Presenting human evaluators with two model outputs for the same prompt. The evaluators select the safer response, training a reward model to penalize toxic or harmful outputs.
*   **Hallucination:** Occurs when the model generates semantically plausible but factually incorrect outputs.  <br /> 🔍 **Example:** Asking an LLM to cite legal cases. The model generates a realistic-sounding case name and citation (for example, `"Smith v. Jones, 412 F.3d 92"`) that does not exist in any database.

---

## 5. ⚙️ Bedrock Parameters and Deployment Settings

When deploying models in the Amazon Bedrock console, you can configure these generation parameters:

*   **Temperature:** Controls response randomness from $0$ to $1.0$. A temperature of $0$ is deterministic, always choosing the most probable token. Higher values add variety and creativity.  <br /> 🔍 **Example:** Setting Temperature to $0.0$ for a database query helper to ensure it outputs the exact same SQL syntax for identical queries. Setting it to $0.8$ for generating product marketing copy to get diverse descriptions.
*   **Top-P (Nucleus Sampling):** Filters token choices based on cumulative probability, from $0$ to $1.0$.  <br /> 🔍 **Example:** If Top-P is set to $0.90$, and the top three words ("the", "a", "an") have a combined probability of $91\%$, only these three words are considered for the next token, ignoring all other words in the vocabulary.
*   **Top-K:** Restricts token choices to the top $K$ most probable words, from $1$ to $500$.  <br /> 🔍 **Example:** Setting Top-K to $50$ restricts token selection to the 50 most likely words, preventing the model from choosing rare words.
*   **Max Length:** Binds the maximum number of tokens generated in the response.  <br /> 🔍 **Example:** Setting Max Length to $150$ tokens to ensure that customer support chatbot responses do not exceed 1-2 paragraphs.

### 💰 Bedrock Billing Modes
*   **On-Demand:** A pay-as-you-go model where you are billed per $1000$ input and output tokens.  <br /> 🔍 **Example:** Querying Claude 3 on Bedrock. You are billed exactly \\$0.003 per $1,000$ input tokens and \\$0.015 per $1,000$ output tokens based on usage.
*   **Provisioned Throughput:** Allocates dedicated capacity represented by Model Units (MUs) with a 1-month or 6-month commitment. This mode is required if you want to deploy custom fine-tuned models.  <br /> 🔍 **Example:** An enterprise deploys a custom, fine-tuned Titan model. They purchase 1 Model Unit (MU) with a 1-month commitment, guaranteeing a throughput of 100 tokens per second, paying a flat hourly rate regardless of usage.

---

## 6. 📊 Model Architectures Comparison

| Architecture | Attention Masking | Primary Task | Examples | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Decoder-Only** | Causal mask; tokens only look backward. | Autoregressive text generation. | Claude, Llama, GPT. | Writing emails or code. |
| **Encoder-Decoder** | Bidirectional in encoder, causal in decoder. | Sequence-to-sequence mapping. | T5, BART. | Text summarization or translation. |
| **Encoder-Only** | Bidirectional; tokens look forward and backward. | Semantic classification. | BERT, RoBERTa. | Sentiment analysis or search indexing. |
