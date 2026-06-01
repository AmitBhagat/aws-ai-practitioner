import React, { useState, useMemo } from 'react';

const GLOSSARY_TERMS = [
  {
    id: 'supervised-learning',
    term: 'Supervised Learning',
    category: 'ML Fundamentals',
    definition: 'A machine learning approach where an organization trains a predictive model using historical datasets that already contain labeled ground-truth answers. For instance, a financial institution inputs previous credit card applications labeled as either approved or denied so that the algorithm can learn the correlation between applicant variables and risk outcomes, allowing it to automatically evaluate new incoming applicants in real-time.',
    examTakeaway: 'Requires human-labeled ground truth datasets. Used for forecasting numbers (regression) or categorizing items (classification).',
    quizReference: 'Question 4, Question 14'
  },
  {
    id: 'unsupervised-learning',
    term: 'Unsupervised Learning',
    category: 'ML Fundamentals',
    definition: 'A machine learning paradigm used when a company needs to discover hidden patterns, anomalies, or natural customer groupings within raw, unlabeled datasets. For example, an e-commerce firm analyzes millions of historical customer transaction records to automatically cluster shoppers into separate high-value and low-value marketing cohorts, bypassing the need for manual data labeling or predefined classification categories.',
    examTakeaway: 'Ideal for customer segment profiling or market basket analysis using clustering algorithms like K-Means without pre-existing labels.',
    quizReference: 'Question 17'
  },
  {
    id: 'reinforcement-learning',
    term: 'Reinforcement Learning (RL)',
    category: 'ML Fundamentals',
    definition: 'A machine learning training methodology where an autonomous software agent learns to make decisions by interacting with a dynamic environment through trial and error. The agent receives positive numerical rewards for executing desirable actions and penalties for sub-optimal choices, such as training an autonomous warehouse forklift to navigate narrow aisles by maximizing path efficiency while avoiding collisions.',
    examTakeaway: 'Operates on a continuous loop of actions, states, rewards, and penalties without explicit labeled training examples.',
    quizReference: 'Question 14'
  },
  {
    id: 'deep-learning',
    term: 'Deep Learning (DL)',
    category: 'ML Fundamentals',
    definition: 'An advanced subset of machine learning that utilizes multi-layered artificial neural networks containing at least three or more hidden layers to process highly complex inputs. This setup allows systems like security camera monitors to automatically learn and extract hierarchical patterns (like recognizing specific safety violations in warehouse feeds) from unstructured visual or auditory datasets without requiring manual feature engineering.',
    examTakeaway: 'A neural network must cross the three hidden layers threshold to be defined as deep learning. Excels at processing unstructured visual or audio data.',
    quizReference: 'Question 3, Question 36'
  },
  {
    id: 'transfer-learning',
    term: 'Transfer Learning',
    category: 'GenAI & LLMs',
    definition: 'An efficient machine learning strategy where an existing foundation model pre-trained on massive public datasets is repurposed to solve a new, related task. This approach is highly favored by startups and enterprise AI teams because it avoids the massive compute budgets and data collection hurdles of training a model from scratch, requiring only minor weight adjustments during domain-specific fine-tuning.',
    examTakeaway: 'The foundational strategy behind deploying pre-trained foundation models. It saves massive budget and training time by reusing existing weights.',
    quizReference: 'Question 7'
  },
  {
    id: 'weights',
    term: 'Weights (W)',
    category: 'ML Mathematics',
    definition: 'The learnable mathematical parameters inside a neural network that dictate the relative importance and influence of incoming input features on the final output prediction. During the backpropagation training phase, these variables are adjusted iteratively using gradient descent to minimize overall prediction errors, ensuring that high-importance words or features receive stronger positive or negative coefficients.',
    examTakeaway: 'Weights represent the internal learned parameters that directly multiply the input features during mathematical forward passes.',
    quizReference: 'Question 11'
  },
  {
    id: 'biases',
    term: 'Biases (b)',
    category: 'ML Mathematics',
    definition: 'The learnable offset parameters added to a neural network\'s calculations that allow the model to shift its activation function threshold independently of the input features. This parameter functions similarly to the intercept in a linear equation, ensuring that individual neurons can activate or remain dormant even when the primary incoming input feature values are zero or extremely weak.',
    examTakeaway: 'Added directly to the weighted sum of inputs ($W \\cdot X + b$) to shift the activation function output offset.',
    quizReference: 'Question 11'
  },
  {
    id: 'activation-function',
    term: 'Activation Function',
    category: 'ML Mathematics',
    definition: 'The mathematical logic layers applied to a neural network\'s weighted sums to introduce non-linear relationships into the model\'s decision-making process. Without these mathematical transformations, a neural network collapses into a single giant linear regression formula, completely preventing it from learning complex patterns or separating non-linear boundaries in real-world business datasets.',
    examTakeaway: 'Prevents the neural network from collapsing into a single giant linear regression equation, enabling complex curve modeling.',
    quizReference: 'Question 11'
  },
  {
    id: 'relu',
    term: 'ReLU (Rectified Linear Unit)',
    category: 'ML Mathematics',
    definition: 'A fast and computationally efficient activation function that outputs positive inputs directly while converting all negative inputs to a constant zero. While it significantly accelerates model training speeds, it is prone to the \'Dying ReLU\' problem where neurons that consistently receive negative values permanently stop updating their weights and become useless.',
    examTakeaway: 'Outputs $f(x) = \\max(0, x)$. Prone to the \'Dying ReLU\' issue where negative inputs yield a constant zero slope, stopping learning.',
    quizReference: 'Question 11'
  },
  {
    id: 'leaky-relu',
    term: 'Leaky ReLU',
    category: 'ML Mathematics',
    definition: 'An optimized variation of the standard ReLU activation function designed specifically to prevent the \'Dying ReLU\' problem. It introduces a small, non-zero slope (typically $0.01x$) for negative input values, ensuring that a tiny gradient continues to flow through the network during backpropagation so that neurons can recover and update their weights over time.',
    examTakeaway: 'Directly resolves the Dying ReLU issue by ensuring a constant non-zero slope (e.g., $0.01x$) exists for negative inputs.',
    quizReference: 'Question 11'
  },
  {
    id: 'sigmoid',
    term: 'Sigmoid Function',
    category: 'ML Mathematics',
    definition: 'A smooth, S-shaped activation function that maps any real-valued input number into a probability score strictly between $0$ and $1$. It is the standard mathematical choice for the output layer of binary classification models, such as predicting a simple yes-or-no probability for online credit applications or detecting whether an email is spam.',
    examTakeaway: 'Squeezes real-valued numbers into a $[0, 1]$ interval. Ideal for single-label, two-class (binary) classification output layers.',
    quizReference: 'Question 11'
  },
  {
    id: 'softmax',
    term: 'Softmax Function',
    category: 'ML Mathematics',
    definition: 'An activation function that converts a vector of raw neural network outputs into a clean probability distribution that sums to exactly $1.0$ across all candidate classes. It is the mandatory output layer setting for multi-class classification tasks, such as automatically classifying plant leaf disease images into one of twenty mutually exclusive categories.',
    examTakeaway: 'Converts raw scores into multi-class probabilities that sum to exactly $1.0$ (100%), ensuring mutually exclusive category boundaries.',
    quizReference: 'Question 11'
  },
  {
    id: 'transformer',
    term: 'Transformer Architecture',
    category: 'GenAI & LLMs',
    definition: 'The pioneering deep learning model design that serves as the foundation for modern large language models. By replacing sequential word-by-word recurrent loops with parallelized self-attention operations, it allows AI teams to train models on massive text datasets across huge GPU clusters in a fraction of the time required by older architectures.',
    examTakeaway: 'Eliminates the sequential word-by-word processing bottleneck of older RNN networks, allowing massive multi-node GPU scaling.',
    quizReference: 'Question 35'
  },
  {
    id: 'self-attention',
    term: 'Self-Attention',
    category: 'GenAI & LLMs',
    definition: 'A key mechanism within Transformer networks that calculates the mathematical relationships and semantic relevance between all words in an input prompt simultaneously. This capability allows a model to correctly resolve pronoun references and contextual grammar in complex business documents, such as mapping the word \'it\' back to its proper noun across long paragraphs.',
    examTakeaway: 'Allows models to capture context and non-adjacent word relationships in a sequence with extreme accuracy.',
    quizReference: 'Question 35'
  },
  {
    id: 'context-window',
    term: 'Context Window',
    category: 'GenAI & LLMs',
    definition: 'The maximum boundary of combined input and output tokens that a foundation model can successfully process during a single API invocation or chat session. Exceeding this hard hardware-constrained limit triggers immediate generation errors, truncated responses, or elevated transaction costs, forcing developers to carefully chunk long documents during RAG indexing.',
    examTakeaway: 'Directly limits the size of prompts and RAG contexts you can send to Amazon Bedrock models in a single API transaction.',
    quizReference: 'Question 23, Question 47'
  },
  {
    id: 'temperature',
    term: 'Temperature',
    category: 'GenAI & LLMs',
    definition: 'A runtime generative parameter that regulates the creativity and randomness of a foundation model\'s output generation. Setting the value to $0.0$ forces the model to be completely deterministic by always selecting the single most probable next token, which is essential for structured technical tasks like generating SQL queries or writing software code.',
    examTakeaway: 'Setting temperature to $0.0$ yields completely deterministic answers by always picking the single most probable next token.',
    quizReference: 'Question 5, Question 24'
  },
  {
    id: 'top-p',
    term: 'Top-P (Nucleus Sampling)',
    category: 'GenAI & LLMs',
    definition: 'A generative configuration parameter that controls token selection diversity by pooling only the most likely candidate words whose combined probability crosses threshold P. This mechanism dynamically scales the size of the vocabulary pool based on the model\'s overall prediction confidence, preventing repetitive phrasing or highly bizarre word combinations.',
    examTakeaway: 'Unlike Top-K, Top-P dynamically changes the candidate pool size based on the model\'s confidence curve passing a set probability threshold.',
    quizReference: 'Question 5'
  },
  {
    id: 'top-k',
    term: 'Top-K',
    category: 'GenAI & LLMs',
    definition: 'A generative parameter that restricts a model\'s word choices strictly to a fixed pool containing only the K most probable next tokens in its vocabulary. Unlike Top-P, this setting keeps the search neighborhood size mathematically constant, ensuring that the generation remains highly stable and predictable by completely blocking low-probability words.',
    examTakeaway: 'Keeps the candidate search neighborhood size strictly constant (e.g., considering only the top $50$ candidates for the next token).',
    quizReference: 'Question 5'
  },
  {
    id: 'rag',
    term: 'Retrieval-Augmented Generation (RAG)',
    category: 'GenAI & LLMs',
    definition: 'A highly cost-effective architecture that grounds a pre-trained foundation model in private, real-time corporate knowledge bases during invocation. The system dynamically retrieves relevant document snippets from a vector database and appends them to the prompt as context, drastically reducing factual hallucinations without the high cost of model fine-tuning.',
    examTakeaway: 'The most cost-efficient method to integrate dynamic, real-time proprietary company data into model prompts without Retraining or Weights updates.',
    quizReference: 'Question 38, Question 47'
  },
  {
    id: 'fine-tuning',
    term: 'Model Fine-Tuning',
    category: 'GenAI & LLMs',
    definition: 'A model customization methodology where a pre-trained foundation model undergoes additional training on a specialized, labeled dataset containing prompt-completion pairs. This updates the model\'s actual internal weight settings, allowing developers to adapt its outputs to adhere to strict corporate brand guidelines, highly specialized terminology, or proprietary formats.',
    examTakeaway: 'Modifies the actual internal weight settings of the model. Best for specialized domain vocabulary, styling guidelines, or strict output formats.',
    quizReference: 'Question 19, Question 38'
  },
  {
    id: 'provisioned-throughput',
    term: 'Provisioned Throughput',
    category: 'GenAI & LLMs',
    definition: 'An Amazon Bedrock billing and allocation model that secures dedicated, guaranteed compute capacity for invoking pre-trained or custom fine-tuned models. Billed at a flat hourly rate using committed Model Units (MUs), this setting is mandatory for serving fine-tuned foundation models to production applications that require high, consistent request volume.',
    examTakeaway: 'Mandatory billing requirement to host and invoke fine-tuned custom models in Bedrock. Provides dedicated compute capacity at a flat rate.',
    quizReference: 'Question 43, Question 53'
  },
  {
    id: 'amazon-bedrock',
    term: 'Amazon Bedrock',
    category: 'AWS Services',
    definition: 'A fully managed serverless AWS service that provides secure, API-based access to a diverse catalog of high-performance foundation models from leading AI organizations. It guarantees strict data isolation, ensuring that a company\'s private prompts, RAG documents, and custom fine-tuning datasets are never used to train the base public models.',
    examTakeaway: 'Provides serverless FM access with built-in security features, support for Knowledge Bases (RAG), and Agents (Action Groups powered by Lambda).',
    quizReference: 'Question 9, Question 13, Question 32, Question 34, Question 38, Question 47'
  },
  {
    id: 'amazon-sagemaker',
    term: 'Amazon SageMaker',
    category: 'AWS Services',
    definition: 'A comprehensive, fully managed AWS machine learning platform that provides end-to-end tools to build, train, deploy, and monitor classical ML and deep learning models. It supports the entire lifecycle from visual data preparation and feature engineering to deploying elastic inference endpoints and tracking production data decay.',
    examTakeaway: 'Supports visual data prep (Wrangler), feature storage (Feature Store), pre-built algorithms (JumpStart), and active drift monitoring (Model Monitor).',
    quizReference: 'Question 6, Question 11, Question 27, Question 33, Question 39, Question 44'
  },
  {
    id: 'sagemaker-canvas',
    term: 'SageMaker Canvas',
    category: 'AWS Services',
    definition: 'A visual, drag-and-drop no-code interface within Amazon SageMaker designed to empower business analysts to build and deploy machine learning models without writing software. While highly convenient for predicting tabular targets like customer churn, users must remember to explicitly log out of their session to terminate the persistent compute instance.',
    examTakeaway: 'No-code visual predictive modeling tool. Users must manually click "Log out" to avoid ongoing compute instance fees ($1.90/hour).',
    quizReference: 'Question 57'
  },
  {
    id: 'sagemaker-clarify',
    term: 'SageMaker Clarify',
    category: 'AWS Services',
    definition: 'A specialized Amazon SageMaker feature that detects potential bias during data preparation and explains model predictions after training. It generates detailed reports on class imbalances and calculates SHAP explainability metrics, helping compliance teams document exactly which input features had the highest mathematical impact on automated credit decisions.',
    examTakeaway: 'Computes pre-training data metrics (Class Imbalance) and post-training explainability scores (SHAP value feature attribution).',
    quizReference: 'Question 39, Question 44, Question 50'
  },
  {
    id: 'sagemaker-feature-store',
    term: 'SageMaker Feature Store',
    category: 'AWS Services',
    definition: 'A centralized, secure catalog designed for data science teams to organize, version, and share machine learning variables across multiple pipelines. It provides an Online Store with millisecond-latency reads for real-time applications and an Offline Store hosted in S3 for compiling large historical datasets for batch training runs.',
    examTakeaway: 'Online Store uses DynamoDB under the hood for millisecond real-time reads. Offline Store compiles S3 files for historical batch training.',
    quizReference: 'Question 11'
  },
  {
    id: 'sagemaker-ground-truth-plus',
    term: 'SageMaker Ground Truth Plus',
    category: 'AWS Services',
    definition: 'A fully managed data labeling service that provides an expert, AWS-managed workforce to annotate raw datasets for machine learning training. By handling the end-to-end labeling workflows, workspace provisioning, and quality validation loops, it dramatically reduces administrative overhead compared to self-managed human-in-the-loop options.',
    examTakeaway: 'Saves administrative effort compared to standard Ground Truth by completely offloading worker management and validation flows to AWS.',
    quizReference: 'Question 8'
  },
  {
    id: 'sagemaker-model-monitor',
    term: 'SageMaker Model Monitor',
    category: 'AWS Services',
    definition: 'A continuous model governance service that captures real-time production endpoint payloads to detect statistical decay and performance loss. It automatically triggers Amazon CloudWatch alarms if incoming feature distributions (Data Drift) or prediction mapping behaviors (Concept Drift) shift away from the baseline boundaries established during training.',
    examTakeaway: 'Watches endpoints continuously and flags CloudWatch alerts for Data Quality, Concept, and Feature Attribution drifts.',
    quizReference: 'Question 45, Question 47'
  },
  {
    id: 'amazon-macie',
    term: 'Amazon Macie',
    category: 'AWS Security & Gov',
    definition: 'A fully managed data security and privacy service that leverages machine learning and pattern matching to automatically discover and protect Personally Identifiable Information (PII) like SSNs or credit card numbers. Crucially for exam scenarios, its scanning capability is restricted strictly to files stored in Amazon S3 buckets.',
    examTakeaway: 'Restricted strictly to scanning files in S3 buckets. Cannot directly scan databases (like RDS) or local compute drives (EBS) in-place.',
    quizReference: 'Question 13, Question 50'
  },
  {
    id: 'aws-privatelink',
    term: 'AWS PrivateLink',
    category: 'AWS Security & Gov',
    definition: 'A secure, private networking service that establishes interface VPC endpoints to route traffic directly between an enterprise network and AWS services like Amazon Bedrock. It ensures that sensitive customer queries and RAG document transactions remain entirely within the private AWS network, completely bypassing the public internet.',
    examTakeaway: 'Ensures absolute corporate compliance. Keeps vector searches and Bedrock prompt traffic completely off the untrusted public internet.',
    quizReference: 'Question 13'
  },
  {
    id: 'aws-kms',
    term: 'AWS Key Management Service (KMS)',
    category: 'AWS Security & Gov',
    definition: 'A managed service used to create, control, and audit cryptographic keys to encrypt data at rest across AWS resources like S3 buckets, SageMaker model cards, and EBS volumes. To run secure inference, the IAM execution role assumed by Bedrock or SageMaker must have explicit permissions to decrypt data.',
    examTakeaway: 'The execution role assumed by Bedrock or SageMaker must have explicit `kms:Decrypt` access rights to process encrypted data sources.',
    quizReference: 'Question 9'
  },
  {
    id: 'aws-cloudtrail',
    term: 'AWS CloudTrail',
    category: 'AWS Security & Gov',
    definition: 'A cloud auditing and governance service that records a continuous log of API transactions across a company\'s entire AWS infrastructure. It is the primary security tool used to audit access logs and quickly identify unauthorized attempts to invoke, modify, or download Amazon Bedrock foundation models.',
    examTakeaway: 'The standard cloud auditing utility to inspect API activity and locate unauthorized calls targeting Bedrock models.',
    quizReference: 'Question 26'
  },
  {
    id: 'data-drift',
    term: 'Data Drift (Covariate Shift)',
    category: 'Drift & Metrics',
    definition: 'A statistical shift where the mathematical distribution of incoming production input features changes over time, while the underlying classification relationship remains constant. For example, a fraud detection model experiences a massive surge in online transactions compared to physical sweeps during a holiday season, changing the input features without altering fraud relationships.',
    examTakeaway: 'The input feature values change shape ($P(X)$ shifts), but the prediction mapping mapping rules ($P(Y|X)$) remain stable.',
    quizReference: 'Question 20, Question 45'
  },
  {
    id: 'concept-drift',
    term: 'Concept Drift',
    category: 'Drift & Metrics',
    definition: 'A performance decay that occurs when the real-world relationship between input features and target predictions shifts over time, rendering trained model weights obsolete. For instance, a sudden macroeconomic recession changes default rates across all credit score brackets, causing a trained loan risk model to fail even though input data shapes look identical.',
    examTakeaway: 'The underlying prediction target mapping ($P(Y|X)$) decays, rendering historical training weights incorrect even if input formats are identical.',
    quizReference: 'Question 45'
  },
  {
    id: 'precision',
    term: 'Precision',
    category: 'Drift & Metrics',
    definition: 'A classification evaluation metric that measures the ratio of true positive predictions to the total number of positive predictions made by the model. It is the primary metric to optimize when false alarms (False Positives) are highly disruptive or expensive, such as a spam filter blocking an important business email.',
    examTakeaway: 'Formula: $\\frac{TP}{TP + FP}$. Prioritize when False Positives are expensive, disruptive, or trigger critical system locks.',
    quizReference: 'Question 46'
  },
  {
    id: 'recall',
    term: 'Recall (Sensitivity)',
    category: 'Drift & Metrics',
    definition: 'A classification evaluation metric that measures the ratio of true positive predictions to the total number of actual positive instances present in the dataset. It is the critical metric to optimize when missing a positive case (False Negative) is catastrophic, such as failing to flag transaction fraud or tumor diagnoses.',
    examTakeaway: 'Formula: $\\frac{TP}{TP + FN}$. Prioritize when False Negatives carry dangerous physical, legal, or severe financial consequences.',
    quizReference: 'Question 46'
  },
  {
    id: 'bleu',
    term: 'BLEU Score',
    category: 'Drift & Metrics',
    definition: 'An automated evaluation metric that measures translation quality by calculating n-gram overlaps between model-generated text and professional human reference translations. Yielding a score between $0$ and $1.0$, it is purely structural and can penalize completely valid synonyms if they do not match the reference vocabulary exactly.',
    examTakeaway: 'A structural n-gram scoring mechanism. Highly sensitive to exact vocabulary; penalizes alternative semantic choices.',
    quizReference: 'Question 55'
  },
  {
    id: 'bertscore',
    term: 'BERTScore',
    category: 'Drift & Metrics',
    definition: 'A semantic evaluation metric that leverages contextual word embeddings to assess the semantic similarity between model-generated text and reference translations. It is highly superior to BLEU for chat applications and creative writing because it measures overall meaning and intent rather than penalizing alternative synonyms.',
    examTakeaway: 'A semantic-based scoring approach. Evaluates contextual word vectors to support valid synonyms without unnecessary score penalties.',
    quizReference: 'Question 55'
  },
  {
    id: 'prompt-injection',
    term: 'Prompt Injection',
    category: 'AWS Security & Gov',
    definition: 'A critical security threat where an adversary inputs malicious text to manipulate a foundation model into bypassing its safety guidelines or exposing sensitive internal instructions. This can occur directly via user input fields, or indirectly when a RAG application reads a compromised external PDF document.',
    examTakeaway: 'Can occur as a Direct attack (user inputs) or Indirect threat (model parses a malicious website or PDF resume). Prevented using Guardrails for Bedrock.',
    quizReference: 'Question 29'
  },
  {
    id: 'iso-42001',
    term: 'ISO/IEC 42001',
    category: 'AWS Security & Gov',
    definition: 'The international certification standard specifying strict requirements for establishing and managing artificial intelligence systems responsibly in enterprise environments. It provides audit frameworks for documenting data lineage, managing model bias risks, and implementing continuous security and transparency controls.',
    examTakeaway: 'Provides standard guidelines for auditing AI systems, logging model bias risks, and verifying corporate responsible AI compliance.',
    quizReference: 'Question 54'
  },
  {
    id: 'aws-budgets',
    term: 'AWS Budgets',
    category: 'AWS Security & Gov',
    definition: 'A cloud cost management service that allows finance and AI teams to set custom spending limits and receive automated email alerts when forecasted costs exceed thresholds. It is crucial for preventing runaway compute expenses associated with SageMaker training jobs or Bedrock token invocations.',
    examTakeaway: 'Used to prevent runaway GenAI costs by alerting administrators before compute or API expenses breach allocated financial thresholds.',
    quizReference: 'Question 55'
  },
  {
    id: 'decision-trees',
    term: 'Decision Trees',
    category: 'ML Fundamentals',
    definition: 'A classical, tree-structured supervised machine learning model that recursively splits data based on feature values to reach a prediction. It is the preferred choice for compliance-heavy industries because the resulting splits provide a highly transparent and easily documentable decision path compared to black-box neural networks.',
    examTakeaway: 'Provides visual, explicit logic paths. The preferred classical ML model choice to satisfy strict explainability requirements.',
    quizReference: 'Question 3'
  },
  {
    id: 'accuracy',
    term: 'Accuracy',
    category: 'Drift & Metrics',
    definition: 'A classification metric that measures the ratio of correct predictions (True Positives + True Negatives) to the total number of evaluated cases. While highly intuitive for balanced classes, it becomes extremely misleading when classes are imbalanced, such as a fraud classifier achieving 99.9% accuracy by simply predicting that no transactions are fraudulent.',
    examTakeaway: 'Formula: $\\frac{TP+TN}{\\text{Total}}$. Avoid choosing this metric to assess performance on highly imbalanced targets.',
    quizReference: 'Question 4'
  },
  {
    id: 'async-inference',
    term: 'Asynchronous Inference',
    category: 'AWS Services',
    definition: 'An Amazon SageMaker endpoint hosting option designed for processing large input payloads (up to 1 GB) and heavy execution runtimes (up to 1 hour). It queues incoming requests via Amazon SQS, writes prediction files to Amazon S3, and supports autoscaling the underlying compute instances down to zero when the queue is empty.',
    examTakeaway: 'Queues requests automatically via SQS. Best for near real-time scale constraints with heavy payloads or long runtime thresholds.',
    quizReference: 'Question 6'
  },
  {
    id: 'amazon-q-developer',
    term: 'Amazon Q Developer',
    category: 'AWS Services',
    definition: 'A generative AI-powered conversational coding assistant that integrates within developer IDEs to boost software engineering productivity. It generates high-fidelity code snippets, explains legacy code blocks, identifies security vulnerabilities, and tracks open-source license references to ensure compliance with corporate policies.',
    examTakeaway: 'IDE-based assistant to boost developer speed while tracking open-source licensing compatibility and referencing policies.',
    quizReference: 'Question 12'
  },
  {
    id: 'amazon-transcribe',
    term: 'Amazon Transcribe',
    category: 'AWS Services',
    definition: 'A fully managed automatic speech recognition (ASR) service that converts audio conversations or recordings into clean text files. It supports advanced features like speaker diarization (identifying who spoke when), custom vocabulary uploads for specialized jargon, and automated redaction of sensitive PII data.',
    examTakeaway: 'Converts speech to text. The standard service used to convert audio call center recordings into transcripts for downstream analysis.',
    quizReference: 'Question 16'
  },
  {
    id: 'anomaly-detection',
    term: 'Anomaly Detection',
    category: 'ML Fundamentals',
    definition: 'A machine learning approach used to automatically identify rare items, outliers, or suspicious data points that deviate significantly from established normal behaviors. It is widely deployed in network security pipelines to flag suspicious IP addresses and in financial compliance systems to intercept unusual transaction patterns.',
    examTakeaway: 'Clustered or modeled threat detection approach. Automatically flags out-of-bounds metrics to alert security operations teams.',
    quizReference: 'Question 20'
  },
  {
    id: 'opensearch-vector-engine',
    term: 'OpenSearch Serverless (Vector Engine)',
    category: 'AWS Services',
    definition: 'A highly scalable, serverless deployment option for Amazon OpenSearch Service engineered specifically to handle high-performance vector database workloads. It provides nearest neighbor search (k-NN) capabilities and vector indexing, enabling developers to build low-latency semantic search queries to ground Bedrock foundation models.',
    examTakeaway: 'The serverless vector database backend to enable quick semantic retrieval and similarity search indexing for Bedrock Knowledge Bases.',
    quizReference: 'Question 21'
  },
  {
    id: 'sagemaker-jumpstart',
    term: 'SageMaker JumpStart',
    category: 'AWS Services',
    definition: 'A comprehensive model hub within the SageMaker console that provides single-click access to pre-trained open-source foundation models, built-in algorithms, and ready-to-run solutions. It allows enterprise AI teams to safely deploy, fine-tune, and consume state-of-the-art models within their secure Virtual Private Cloud (VPC) boundaries.',
    examTakeaway: 'Allows teams to instantly discover, deploy, and customize pre-trained open-source foundation models safely within a secure VPC network.',
    quizReference: 'Question 33, Question 40'
  },
  {
    id: 'quicksight-q',
    term: 'Amazon QuickSight Q',
    category: 'AWS Services',
    definition: 'A generative BI natural language utility embedded within Amazon QuickSight. It empowers non-technical business leaders to ask spontaneous questions about corporate data dashboards in plain English, automatically generating SQL queries and rendering immediate visual answers behind the scenes.',
    examTakeaway: 'A natural language BI utility. Allows business teams to run spontaneous SQL-level queries and dashboard updates using natural text prompts.',
    quizReference: 'Question 103'
  },
  {
    id: 'aws-data-exchange',
    term: 'AWS Data Exchange',
    category: 'AWS Services',
    definition: 'A secure, managed cloud marketplace that simplifies how organizations license, subscribe to, and consume external third-party datasets. It integrates natively with S3 and AWS Lake Formation, sending automated SNS alerts when new compliance reports or dataset updates become available.',
    examTakeaway: 'A cloud data hub to safely license external third-party datasets and compliance feeds, supporting automated bucket synchronization.',
    quizReference: 'Question 28'
  },
  {
    id: 'overfitting',
    term: 'Overfitting',
    category: 'ML Fundamentals',
    definition: 'A critical model training failure where an algorithm memorizes the noise, outliers, and highly specific details of its training dataset too perfectly. This causes its predictive performance to decay significantly when deployed to production, which is resolved by training the model on larger, more diverse datasets.',
    examTakeaway: 'Indicated by great training accuracy but terrible validation/production performance. Resolved by training on larger, more diverse datasets.',
    quizReference: 'Question 45'
  },
  {
    id: 'benchmark-datasets',
    term: 'Benchmark Datasets',
    category: 'Drift & Metrics',
    definition: 'Standardized, publicly available datasets (like GLUE or ImageNet) used to evaluate and compare the performance, safety, bias, and robustness of machine learning models. Using these pre-compiled benchmarks allows compliance teams to conduct initial safety and fairness audits with the least possible administrative effort.',
    examTakeaway: 'Saves developer time. Standard tools to run baseline security and fair-treatment assessments before deploying custom FMs.',
    quizReference: 'Question 48'
  }
];

const CATEGORIES = ['All', 'ML Fundamentals', 'GenAI & LLMs', 'AWS Services', 'AWS Security & Gov', 'Drift & Metrics', 'ML Mathematics'];

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLetter, setActiveLetter] = useState('All');

  // Filter and sort terms
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(item => {
      // Category match
      const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
      
      // Search match
      const searchMatch = !searchTerm || 
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.examTakeaway.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Letter match
      const firstLetter = item.term.charAt(0).toUpperCase();
      const letterMatch = activeLetter === 'All' || firstLetter === activeLetter;

      return categoryMatch && searchMatch && letterMatch;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchTerm, selectedCategory, activeLetter]);

  // Alphabet index list
  const alphabet = useMemo(() => {
    const letters = new Set();
    GLOSSARY_TERMS.forEach(item => {
      letters.add(item.term.charAt(0).toUpperCase());
    });
    return ['All', ...Array.from(letters).sort()];
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      {/* Page Header */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>📖 AWS Certified AI Practitioner Glossary</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
          Deconstruct high-frequency exam terms, technical keywords, and core AWS AI/ML services. Search, filter, and study exact takeaways grounded in Pearson VUE exam specifications.
        </p>
      </div>

      {/* Controls Container */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        {/* Search input */}
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Search keywords, definitions, or exam gotchas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              outline: 'none',
            }}
          />
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }}>🔍</span>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            Filter by Category
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => { setSelectedCategory(category); setActiveLetter('All'); }}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  border: selectedCategory === category ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                  background: selectedCategory === category ? 'var(--accent-cyan-glow)' : 'transparent',
                  color: selectedCategory === category ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Alphabet Filter Index */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            A-Z Jump Index
          </div>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  border: activeLetter === letter ? '1px solid var(--accent-violet)' : '1px solid var(--border-color)',
                  background: activeLetter === letter ? 'var(--accent-violet-glow)' : 'transparent',
                  color: activeLetter === letter ? 'var(--accent-violet)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', padding: '0 0.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredTerms.length}</strong> terms matching filter parameters
        </span>
        {(searchTerm || selectedCategory !== 'All' || activeLetter !== 'All') && (
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setActiveLetter('All'); }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-rose)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'underline'
            }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Glossary Listing */}
      <div className="glass-card" style={{ padding: '1.5rem 2rem' }}>
        {filteredTerms.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredTerms.map((item, index) => (
              <div 
                key={item.id} 
                style={{ 
                  padding: '1.1rem 0', 
                  borderBottom: index === filteredTerms.length - 1 ? 'none' : '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem'
                }}
              >
                {/* Card Title Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 600 }}>{item.term}</h3>
                </div>

                {/* Definition */}
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, textAlign: 'justify', lineHeight: '1.5' }}>
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem' }}>🔍</span>
            <h3 style={{ fontSize: '1.1rem' }}>No matching keywords discovered</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '400px', margin: '0 auto', marginTop: '0.25rem' }}>
              Adjust your search parameters or select a different category option from the navigation controls above to reset the index.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
