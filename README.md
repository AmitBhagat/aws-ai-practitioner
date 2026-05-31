# 🎓 AWS Certified AI Practitioner (AIF-C01) Complete Technical Study Guide

Welcome to the ultimate, high-density, mathematically rigorous study guide repository for the **AWS Certified AI Practitioner (AIF-C01)** certification. 

This repository deconstructs the complete AWS AI/ML and Generative AI syllabus into **16 logically sequenced modules**. Each module progresses linearly, serving as a structured building block for the next. The files are fully optimized with relative links for seamless navigation when deployed directly to **GitHub**.

---

## 🗺️ Master Logical Learning Path & Index

| Module | Study Module & Clickable relative Link | Target Blueprint Domain | Core Technical & Mathematical Focus |
| :---: | :--- | :--- | :--- |
| **01** | **[01. Exam Metrics & IRT Scoring Engine](detailed_topics/01_exam_metrics.md)** | General Mechanics | Scaled scoring, scored/unscored question split, proctoring specs, and **Item Response Theory (IRT)** 3PL formula. |
| **02** | **[02. Foundational Concepts of AI/ML](detailed_topics/02_foundational_concepts.md)** | Domain 1 & 2 | AI vs. ML vs. DL vs. GenAI nested hierarchy, **Empirical Risk Minimization (ERM)**, CPU vs. GPU profiles. |
| **03** | **[03. Machine Learning Paradigms](detailed_topics/03_traditional_ml.md)** | Domain 1 | Supervised, Unsupervised, Reinforcement, hybrid learning, inductive/transductive inference, ensembles. |
| **04** | **[04. Classical ML Algorithms & Math](detailed_topics/04_traditional_ml_algorithms.md)** | Domain 1 | Regression, classification, clustering, **Association Rule Learning** math (Support, Confidence, Lift), dimensional reduction. |
| **05** | **[05. Data Integration, Lakes & Querying](detailed_topics/05_data_integration_lakes_and_query_services.md)** | Domain 1 & 5 | Glue Spark/Ray distributed ETL engines, crawler schema drift configuration, Lake Formation access, serverless Athena queries. |
| **06** | **[06. Neural Networks & Activations](detailed_topics/06_neural_networks_and_deep_learning.md)** | Domain 1 & 2 | Backpropagation, dense/sparse layers, cross-entropy loss, and **11 activation functions** with math ranges and derivatives. |
| **07** | **[07. Parameter Tuning & SageMaker HPO](detailed_topics/07_parameters_vs_hyperparameters.md)** | Domain 1 | Weights, biases, coefficients, learning rate overshooting, environment pipelines (`SM_MODEL_DIR`, `SM_HPS`), Grid/Bayesian tuning. |
| **08** | **[08. NLP & AWS Speech/Language APIs](detailed_topics/08_nlp.md)** | Domain 1 & 3 | Preprocessing pipelines, syntactic parsing, Comprehend Flywheel, Polly SSML lexicons, Transcribe diarization, Translate, Lex. |
| **09** | **[09. Foundation Models & LLMs](detailed_topics/09_foundation_models_and_llms.md)** | Domain 2 | **Transformer Multi-Head Self-Attention**, positional wave encodings, tokenizers (BPE, WordPiece, SentencePiece), freezing & pruning. |
| **10** | **[10. Prompt Engineering Design Patterns](detailed_topics/10_prompt_engineering_techniques.md)** | Domain 3 | Zero/Few-shot, **Chain-of-Thought (CoT)**, Self-Consistency voting equations, **ReAct loops**, XML structural isolation. |
| **11** | **[11. Advanced RAG & Agentic Workflows](detailed_topics/11_rag_and_agentic_architectures.md)** | Domain 3 | Chunking, pgvector Aurora, OpenSearch serverless, vector similarity math (**Cosine, Dot Product, L2**), HNSW/IVF indexes, Bedrock Agents. |
| **12** | **[12. AWS Managed AI Service Catalog](detailed_topics/12_aws_ai_and_ml_services.md)** | Domain 3 & 5 | Bedrock catalog, Forecast quantiles ($P10, P50, P90$), Rekognition, CodeGuru profiler/security, Amazon Q Business. |
| **13** | **[13. Compute, Storage & Model Deployment](detailed_topics/13_high_performance_compute_and_storage.md)** | Domain 1 & 3 | Custom silicon (**Trainium, Inferentia**), GPU starvation metrics, **FSx for Lustre caching**, SageMaker Endpoints (Real-time, Async, Batch). |
| **14** | **[14. Compliance, Security & Matrix Scopes](detailed_topics/14_compliance_security_governance.md)** | Domain 5 | 5-scope Shared Responsibility Model, 5-scope **Generative AI Security Scoping Matrix**, AWS PrivateLink subnets, KMS encryption. |
| **15** | **[15. Generative AI Threat Mitigations](detailed_topics/15_prompt_injection_and_mitigations.md)** | Domain 3 & 5 | Direct/Indirect prompt injection, jailbreaking, Amazon Bedrock Guardrails safety/PII/word filtering, Contextual Grounding Checks. |
| **16** | **[16. Responsible AI & Model Explainability](detailed_topics/16_responsible_ai_and_explainability.md)** | Domain 4 | Pillars, SageMaker Clarify bias metrics (**CI, DPL, CDD**), explainability (**SHAP math, LIME**), Model Cards, Registry state machine, Monitor. |

---

## 🛠️ Key Repository Features

### 🧮 Mathematical Rigor via LaTeX
Unlike generic summaries, this guide defines algorithms and models using precise, formal LaTeX notation. This includes Item Response Theory parameters, neural network gradients, and game-theoretic attribute values, ensuring you understand the *exact* mechanics behind the tooling.

### 💂 Gritty Real-World Gotchas
Every module includes high-utility, cost-focused **Gotchas** based on real production environments on AWS. For example:
*   How closing the **SageMaker Canvas** browser tab will keep costing you **$1.90/hour** unless you click "Log out".
*   Why deleting a **Bedrock Knowledge Base** leaves underlying **OpenSearch Serverless** vector collections active, silently building a massive bill.
*   How to configure **Crawler Schema Drift** to prevent downstream ETL engines from crashing.

### 🛡️ Unified Security Scopes
We completely deconstruct and contrast the **Shared Responsibility Model for Machine Learning** (Infrastructure vs. Software allocation) against the **Generative AI Security Scoping Matrix** (Consumer App vs. Self-Trained deployment models) so you never confuse these two distinct five-scope frameworks on the exam.

---

## 📈 How to Use This Repository for Exam Readiness

1.  **Follow the Sequence:** Start at **Module 01** to understand exam parameters, then progress sequentially. The concepts in later modules directly build upon algorithms and infrastructure defined in the early chapters.
2.  **Inspect the CodeBlocks & SQL:** Study the SQL scripts in `05_data_integration_lakes_and_query_services.md` and the environment parameter configurations in `07_parameters_vs_hyperparameters.md`. Practical deployment judgment is heavily tested.
3.  **Review the Gotchas:** Pay close attention to S3 CORS rules, KMS cryptographic pipelines, and VPC PrivateLink setups. These are high-value, highly-scoring exam scenarios.
