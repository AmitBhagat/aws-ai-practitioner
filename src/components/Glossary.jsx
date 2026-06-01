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
    definition: 'A fully managed serverless AWS service that provides API access to high-performance foundation models from leading AI companies. It guarantees data isolation, ensuring private prompts and datasets are never used to train the base public models.',
    examTakeaway: 'Provides serverless FM access with built-in security features, support for Knowledge Bases (RAG), and Agents (Action Groups powered by Lambda).',
    quizReference: 'Question 9, Question 13, Question 32, Question 34, Question 38, Question 47'
  },
  {
    id: 'amazon-sagemaker',
    term: 'Amazon SageMaker',
    category: 'AWS Services',
    definition: 'A comprehensive, fully managed AWS platform that provides tools to build, train, deploy, and monitor machine learning models across the entire lifecycle, supporting classical ML, deep learning, visual data preparation, and production monitoring.',
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
    definition: 'A statistical shift where the mathematical distribution of incoming production input features changes over time, while the underlying classification relationship remains constant. For example, a fraud detection model experiences a massive surge in online transactions compared to physical swipes during a holiday season, changing the input features without altering fraud relationships.',
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
  },
  {
    id: 'generative-ai',
    term: 'Generative AI',
    category: 'GenAI & LLMs',
    definition: 'A class of artificial intelligence models designed to synthesize entirely new data outputs (such as images, source code, or conversational text passages) rather than simply classifying existing inputs. For example, a digital marketing agency uses foundation models to automatically generate photorealistic product advertisement mockups from plain text descriptions, accelerating campaign drafts with minimal operational effort.',
    examTakeaway: 'Capable of creating original novel content across text, code, images, and audio, governed by user prompt conditioning.',
    quizReference: 'Question 22'
  },
  {
    id: 'pre-training-bias',
    term: 'Pre-Training Bias',
    category: 'AWS Security & Gov',
    definition: 'A systematic data discrepancy or unfair skew present within the historical raw dataset used to pre-train a foundation model, leading the model to exhibit discriminatory behaviors after deployment. For instance, an image generation model predominantly trained on photos of corporate executives from a single demographic group will struggle to produce balanced diversity when prompted, requiring active mitigation during data selection.',
    examTakeaway: 'Bias embedded during public data ingestion; requires careful ground truth validation and balance correction techniques.',
    quizReference: 'Question 37, Question 48'
  },
  {
    id: 'class-imbalance',
    term: 'Class Imbalance',
    category: 'Drift & Metrics',
    definition: 'A common machine learning data problem where one target label is highly over-represented compared to others in the training set, causing the model to biassedly favor the majority class. For example, in a transaction fraud classifier where 99.9% of card swipes are legitimate, a model can achieve deceptively high accuracy by simply predicting that no swipes are fraudulent, forcing developers to implement sampling techniques or use alternative metrics.',
    examTakeaway: 'Makes overall accuracy highly misleading. Must be resolved via data augmentation or using metrics like F1-Score and Precision/Recall.',
    quizReference: 'Question 4, Question 37'
  },
  {
    id: 'f1-score',
    term: 'F1-Score',
    category: 'Drift & Metrics',
    definition: 'A classification evaluation metric defined mathematically as the harmonic mean of Precision and Recall. It is the preferred evaluation metric to balance target detection performance on highly imbalanced datasets (such as medical diagnostics or industrial anomaly detection), where optimizing solely for accuracy or looking at a single metric would lead to dangerously high rates of false positives or false negatives.',
    examTakeaway: 'Calculated as $2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}$. The standard selection for highly skewed classification targets.',
    quizReference: 'Question 46'
  },
  {
    id: 'r-squared',
    term: 'R-Squared (R²)',
    category: 'Drift & Metrics',
    definition: 'A regression evaluation metric that measures the proportion of variance in the target variable that is explainable by the input features. Yielding a score between $0$ and $1.0$, a retail company uses it to assess how accurately their sales forecasting model predicts upcoming revenue fluctuations based on external marketing spends and weather variables.',
    examTakeaway: 'Tracks model goodness-of-fit. A score of $1.0$ indicates that the input features completely account for all target variability.',
    quizReference: 'Question 4'
  },
  {
    id: 'rmse',
    term: 'RMSE (Root Mean Squared Error)',
    category: 'Drift & Metrics',
    definition: 'A regression evaluation metric that calculates the average magnitude of prediction errors by squaring individual differences, averaging them, and taking the square root. Because it squares the errors before averaging, it penalizes large outliers severely, making it the ideal choice for a logistics company trying to track and minimize massive delays in delivery times.',
    examTakeaway: 'Expresses average error in original target units. Highly sensitive to outliers due to the squaring transformation.',
    quizReference: 'Question 4'
  },
  {
    id: 'regression',
    term: 'Regression',
    category: 'ML Fundamentals',
    definition: 'A supervised machine learning paradigm dedicated to predicting continuous, real-valued numerical variables. For example, a real estate firm trains a regression model on house attributes (like square footage, bedroom count, and postal code) to estimate the exact upcoming list price of new homes entering the market rather than sorting them into simple categories.',
    examTakeaway: 'Focuses strictly on continuous scalar predictions (like pricing, temperature, or demand quantities) rather than categorical bins.',
    quizReference: 'Question 4, Question 14'
  },
  {
    id: 'classification',
    term: 'Classification',
    category: 'ML Fundamentals',
    definition: 'A supervised machine learning paradigm focused on assigning incoming data points into discrete, predefined category labels. For example, a telecommunications firm builds a binary classifier to categorize customers into active or churned categories based on usage drop-offs, enabling their retention team to target at-risk users.',
    examTakeaway: 'Outputs categorical indices (e.g. Fraud / No Fraud, Approved / Denied). Uses output layers like Sigmoid or Softmax.',
    quizReference: 'Question 4, Question 17'
  },
  {
    id: 'clustering',
    term: 'Clustering',
    category: 'ML Fundamentals',
    definition: 'An unsupervised machine learning technique that groups raw, unlabeled data points together based on natural mathematical distances and similarities. For instance, a streaming service analyzes raw user audio preferences and song-skipping intervals to automatically cluster millions of listeners into 10 cohesive musical profiles for playlist curation.',
    examTakeaway: 'A key unsupervised paradigm. Groups observations mathematically (e.g. via K-Means distance metrics) without target labels.',
    quizReference: 'Question 17'
  },
  {
    id: 'few-shot-prompting',
    term: 'Few-Shot Prompting',
    category: 'GenAI & LLMs',
    definition: 'A prompt engineering strategy where developers include a small number of concrete, labeled task examples (e.g., prompt-completion pairs) directly inside the invocation prompt to guide a foundation model. For instance, a company lists three customer reviews labeled positive or negative in the prompt to teach the model how to classify the tone of a fourth, new customer review.',
    examTakeaway: 'Drastically improves prediction structure by demonstrating output formats directly inside the runtime prompt.',
    quizReference: 'Question 5, Question 25'
  },
  {
    id: 'zero-shot-prompting',
    term: 'Zero-Shot Prompting',
    category: 'GenAI & LLMs',
    definition: 'A prompt engineering strategy where a foundation model is asked to perform a task without being provided any prior labeled examples inside the prompt. The developer relies entirely on the model\'s pre-trained vocabulary and semantic instructions, such as submitting a raw customer query directly with the instruction \'Translate this text into Spanish\'.',
    examTakeaway: 'The baseline prompting scenario. Evaluates the FM\'s raw generalized task comprehension without context conditioning.',
    quizReference: 'Question 25'
  },
  {
    id: 'chain-of-thought',
    term: 'Chain-of-Thought Prompting',
    category: 'GenAI & LLMs',
    definition: 'A prompt engineering technique that instructs a foundation model to write out its step-by-step reasoning path before outputting the final answer. For example, when solving a complex multi-step math word problem, the prompt instructs the model to \'explain your steps systematically,\' which significantly improves its reasoning accuracy by decomposing the logic.',
    examTakeaway: 'Forces sequential inference generation. Drastically resolves logical arithmetic and complex step-wise reasoning failures.',
    quizReference: 'Question 5'
  },
  {
    id: 'hallucination',
    term: 'Hallucination',
    category: 'GenAI & LLMs',
    definition: 'A failure state in foundation models where the generated text output is factually incorrect, nonsensical, or completely unsupported by the provided context. This occurs because the model is trained to predict the most probable sequence of words rather than verifying facts, which is mitigated by grounding the model using Retrieval-Augmented Generation.',
    examTakeaway: 'Key generative risk. Controlled via low temperature thresholds or implementing vector-grounded RAG architectures.',
    quizReference: 'Question 38, Question 47'
  },
  {
    id: 'slm',
    term: 'Small Language Model (SLM)',
    category: 'GenAI & LLMs',
    definition: 'Highly optimized, compact deep learning models designed specifically to execute language tasks efficiently in resource-constrained environments like edge devices or mobile phones. By training on highly curated, high-quality narrow datasets, SLMs provide extremely low-latency local inference while completely bypassing the cloud network overhead of massive LLMs.',
    examTakeaway: 'The preferred language model strategy for low-latency edge deployments and resource-constrained micro-compute setups.',
    quizReference: 'Question 10'
  },
  {
    id: 'multi-modal',
    term: 'Multi-Modal Foundation Models',
    category: 'GenAI & LLMs',
    definition: 'A class of foundation models capable of processing and generating outputs across multiple distinct data formats simultaneously (such as text, images, audio, and source code). For instance, an autonomous vehicle company uses a multi-modal embedding model to represent traffic camera feeds and written driver logs in a shared vector space for nearest-neighbor search.',
    examTakeaway: 'Enables cross-data operations (e.g. querying images with natural text prompts) via shared multi-modal coordinate spaces.',
    quizReference: 'Question 18'
  },
  {
    id: 'amazon-comprehend',
    term: 'Amazon Comprehend',
    category: 'AWS Services',
    definition: 'A purpose-built Natural Language Processing (NLP) service that uses machine learning to automatically extract insights, entities, key phrases, and sentiments from text documents. For example, an insurance firm scans incoming customer feedback emails in real-time to detect customer frustration and automatically routes high-severity tickets to executive managers.',
    examTakeaway: 'The standard AWS service for extracting entity insights, parsing review text sentiments, and running automated NLP tasks.',
    quizReference: 'Question 16, Question 46'
  },
  {
    id: 'amazon-lex',
    term: 'Amazon Lex',
    category: 'AWS Services',
    definition: 'A fully managed AWS service designed to build conversational interfaces, chatbots, and voice response systems using advanced natural language understanding. It allows developers to define intents, slots, and fulfillment actions (e.g., integrating Lambda functions), enabling banks to deploy automated phone systems for checking account balances.',
    examTakeaway: 'Purpose-built chatbot framework featuring automatic speech recognition and built-in integration slots for execution Lambdas.',
    quizReference: 'Question 16, Question 46'
  },
  {
    id: 'amazon-rekognition',
    term: 'Amazon Rekognition',
    category: 'AWS Services',
    definition: 'A fully managed AWS computer vision service that automates image and video analysis, enabling capabilities like facial analysis, text extraction from objects, and unsafe content detection. For example, a delivery company uses it to verify photo confirmations of packages left at customer doors to ensure the drop-off location is correct.',
    examTakeaway: 'The core computer vision service used for facial recognition, video frame inspection, and custom visual labeling workflows.',
    quizReference: 'Question 8'
  },
  {
    id: 'amazon-polly',
    term: 'Amazon Polly',
    category: 'AWS Services',
    definition: 'A fully managed cloud service that converts written text into lifelike spoken audio using advanced deep learning text-to-speech technologies. It supports multiple languages and realistic voices, allowing educational platforms to automatically generate high-quality audio books from written course chapters with minimal effort.',
    examTakeaway: 'The standard AWS text-to-speech utility; widely used to generate natural, multi-language conversational voice prompts.',
    quizReference: 'Question 46'
  },
  {
    id: 'sagemaker-data-wrangler',
    term: 'SageMaker Data Wrangler',
    category: 'AWS Services',
    definition: 'A specialized capability inside Amazon SageMaker that simplifies data preparation and feature engineering for machine learning. It provides over 300 built-in data transformations, allowing data scientists to visually clean, join, and balance large datasets from S3 without writing complex ETL code.',
    examTakeaway: 'Lowers compute prep time by providing drag-and-drop visual connectors to easily join, transform, and balance tabular datasets.',
    quizReference: 'Question 11'
  },
  {
    id: 'amazon-personalize',
    term: 'Amazon Personalize',
    category: 'AWS Services',
    definition: 'A fully managed AWS service that enables developers to build real-time, highly customized recommendation engines using the same machine learning technologies powering Amazon.com. For instance, a streaming video application feeds customer viewing logs into it to dynamically serve personalized movie recommendations, boosting user engagement.',
    examTakeaway: 'Managed real-time recommendation system designed to serve customized content directly inside user-facing applications.',
    quizReference: 'Question 33'
  },
  {
    id: 'aws-iam',
    term: 'AWS IAM (Identity & Access)',
    category: 'AWS Security & Gov',
    definition: 'The core security service used to manage access permissions and authentication for AWS resources. To secure Amazon Bedrock deployments, administrators configure strict IAM policies and execution roles based on the principle of least privilege, ensuring that only authorized users or applications can invoke foundation models.',
    examTakeaway: 'Governs model endpoint security. Execution service roles must have explicit permission mappings to invoke foundation models.',
    quizReference: 'Question 9, Question 12, Question 34'
  },
  {
    id: 'vpc-endpoints',
    term: 'VPC Endpoints (PrivateLink)',
    category: 'AWS Security & Gov',
    definition: 'A secure AWS networking capability that allows resources inside a virtual private cloud to privately connect to supported AWS services like Bedrock and S3. By using PrivateLink interface endpoints, sensitive inference request traffic never traverses the public internet, satisfying strict corporate compliance standards.',
    examTakeaway: 'VPC interface endpoints bypass public networks entirely to direct API calls safely within AWS internal network backbones.',
    quizReference: 'Question 13'
  },
  {
    id: 'sagemaker-model-cards',
    term: 'SageMaker Model Cards',
    category: 'AWS Security & Gov',
    definition: 'A documentation standard inside Amazon SageMaker that captures critical metadata, intended use cases, training parameters, and evaluation metrics for machine learning models. It provides a centralized, audited record of model history, helping corporate governance teams satisfy regulatory transparency mandates.',
    examTakeaway: 'A central tool to satisfy compliance transparency audits by registering and documenting critical model configurations and metadata.',
    quizReference: 'Question 11'
  },
  {
    id: 'sagemaker-model-registry',
    term: 'SageMaker Model Registry',
    category: 'AWS Services',
    definition: 'A centralized catalog inside Amazon SageMaker used to register, version, track lineage, and manage the approval status of machine learning models. It enables MLOps teams to automatically promote validated models from staging to production, maintaining a transparent audit trail of active weights.',
    examTakeaway: 'The central platform tool to version, register, and coordinate multi-stage model promotion steps in production pipelines.',
    quizReference: 'Question 53'
  },
  {
    id: 'pdp',
    term: 'Partial Dependence Plots (PDP)',
    category: 'Drift & Metrics',
    definition: 'An explainability visualization technique that shows the marginal effect of one or two input features on the predicted outcome of a machine learning model. By showing stakeholders exactly how changes in a specific variable (like credit card utilization) affect predicted risk scores, PDPs satisfy strict regulatory transparency rules.',
    examTakeaway: 'An interpretability tool showing the isolated marginal influence of specific individual features on model predictions.',
    quizReference: 'Question 1'
  },
  {
    id: 'shap',
    term: 'SHAP Explainability Metrics',
    category: 'Drift & Metrics',
    definition: 'A game-theoretic mathematical framework used to explain individual model predictions by calculating the exact contribution (attribution) of each input feature. For example, SageMaker Clarify computes post-training SHAP values to explain to loan applicants which specific variables had the highest negative impact on their credit assessment.',
    examTakeaway: 'Calculates mathematically sound feature attribution scores to explain individual prediction weights and model behaviors.',
    quizReference: 'Question 39, Question 44'
  },
  {
    id: 'lime',
    term: 'LIME explainability',
    category: 'Drift & Metrics',
    definition: 'An explainability method that builds surrogate interpretable models around specific, individual predictions to approximate the decision boundaries of black-box algorithms locally. This is used by medical research teams to explain exactly why a deep learning model flagged a specific patient image, boosting clinical trust.',
    examTakeaway: 'Local surrogate explainability framework; constructs simple interpretable models to approximate complex global boundaries locally.',
    quizReference: 'Question 1'
  },
  {
    id: 'aws-glue',
    term: 'AWS Glue',
    category: 'AWS Services',
    definition: 'A fully managed, serverless data integration and ETL service that simplifies the process of discovering, cleaning, and preparing data for analytics and machine learning. It catalogues corporate datasets stored in S3, making it easy for data science pipelines to query and import structured tables.',
    examTakeaway: 'Serverless ETL service designed to easily catalogue, transform, and move structured corporate data tables.',
    quizReference: 'Question 28'
  },
  {
    id: 'amazon-athena',
    term: 'Amazon Athena',
    category: 'AWS Services',
    definition: 'An interactive query service that allows developers to run standard SQL queries directly against raw files stored in Amazon S3 buckets. Billed purely on the volume of data scanned, it is the preferred tool for cloud engineers to quickly inspect massive audit logs or compile training datasets without provisioning database servers.',
    examTakeaway: 'Interactive serverless SQL database service to query raw data stored in S3 files directly without compute servers.',
    quizReference: 'Question 28'
  },
  {
    id: 'aws-lake-formation',
    term: 'AWS Lake Formation',
    category: 'AWS Services',
    definition: 'A fully managed service that makes it easy to set up, secure, and govern a secure data lake in S3. It provides fine-grained, column-level access control permissions, allowing AI teams to safely share sensitive customer transaction data across different modeling pipelines without exposing PII.',
    examTakeaway: 'Managed data lake orchestrator providing strict, column-level access control policies on S3 assets.',
    quizReference: 'Question 28'
  },
  {
    id: 'amazon-redshift',
    term: 'Amazon Redshift',
    category: 'AWS Services',
    definition: 'A fast, fully managed, petabyte-scale cloud data warehouse designed for high-performance analytics workloads. It integrates with SageMaker to allow data analysts to train and run predictive models directly on historical warehouse tables using standard SQL statements.',
    examTakeaway: 'Petabyte-scale corporate data warehousing service supporting direct integration with SageMaker ML models.',
    quizReference: 'Question 28'
  },
  {
    id: 'security-matrix',
    term: 'Security Scoping Matrix',
    category: 'AWS Security & Gov',
    definition: 'A security scoping framework (Scopes 1 to 5) that defines the division of security responsibilities between AWS and the customer based on model deployment types. Scope 1 represent raw public API consumer models with the least customer operational overhead, while Scope 5 represents building custom models from scratch.',
    examTakeaway: 'Specifies client vs provider security boundaries across 5 deployment scopes. Scope 5 grants maximum customer security ownership.',
    quizReference: 'Question 30'
  },
  {
    id: 'bedrock-guardrails',
    term: 'Amazon Bedrock Guardrails',
    category: 'AWS Security & Gov',
    definition: 'A native Amazon Bedrock security capability that allows organizations to define strict content filtering, PII masking, and word redaction policies across their foundation model deployments. It evaluates user inputs and model outputs in real-time, instantly blocking prompt injections or inappropriate answers.',
    examTakeaway: 'Enforces strict, multi-stage content safety parameters to redact PII and block injection scripts at the API boundary.',
    quizReference: 'Question 29'
  },
  {
    id: 'model-customization',
    term: 'Model Customization',
    category: 'GenAI & LLMs',
    definition: 'The broad process of modifying a foundation model\'s capabilities using fine-tuning or continued pre-training datasets. This updates the model\'s actual weight configurations inside Bedrock to excel at specialized linguistic contexts, requiring provisioned throughput capacity to serve endpoints.',
    examTakeaway: 'The umbrella term for fine-tuning or continued pre-training inside Bedrock to permanently update base model weights.',
    quizReference: 'Question 19, Question 43'
  },
  {
    id: 'hyperparameters',
    term: 'Hyperparameters',
    category: 'ML Fundamentals',
    definition: 'The external configurations and settings set by data scientists before model training begins that guide the learning algorithm (such as learning rate, epochs, or batch size). Unlike model weights, these variables are not learned during training and must be tuned manually using SageMaker Autopilot.',
    examTakeaway: 'External training guideposts (epochs, batch size) that must be set manually prior to launching active model training runs.',
    quizReference: 'Question 3, Question 11, Question 45'
  },
  {
    id: 'learning-rate',
    term: 'Learning Rate (alpha)',
    category: 'ML Fundamentals',
    definition: 'A critical model training hyperparameter that controls the step size the optimization algorithm takes when adjusting parameters to minimize the loss function. Setting the step size too large can cause the model to overshoot optimal parameters, while setting it too small results in excessively slow training speeds.',
    examTakeaway: 'Controls step weight updates. Extreme values risk overshooting optimal settings or causing slow model convergence.',
    quizReference: 'Question 11, Question 45'
  },
  {
    id: 'epochs',
    term: 'Epochs',
    category: 'ML Fundamentals',
    definition: 'A model training hyperparameter representing the total number of complete passes the learning algorithm makes through the entire training dataset. Increasing the parameter size allows the model to learn more complex relationships, but setting it too high causes the model to overfit the noise in the training set.',
    examTakeaway: 'Calculates total complete iterations through a training dataset. Excessive values trigger training overfitting states.',
    quizReference: 'Question 7, Question 41, Question 45'
  },
  {
    id: 'batch-size',
    term: 'Batch Size',
    category: 'ML Fundamentals',
    definition: 'A model training hyperparameter that defines the number of training samples processed before the algorithm updates the model\'s internal parameter weights. Choosing a smaller configuration size reduces memory requirements during training runs, while larger sizes accelerate hardware utilization on GPU clusters.',
    examTakeaway: 'Configures sample subsets processed before parameters update. Controls memory loads and GPU pipeline scaling attributes.',
    quizReference: 'Question 41'
  },
  {
    id: 'loss-function',
    term: 'Loss Function',
    category: 'ML Fundamentals',
    definition: 'A mathematical function that calculates the exact difference between a model\'s predictions and actual ground-truth labels during training. The optimization algorithm uses the output of this function to run gradient descent backpropagation updates, systematically steering weights to minimize overall prediction errors.',
    examTakeaway: 'Calculates mathematical target errors (e.g. RMSE or Cross-Entropy) to guide gradient adjustments during backpropagation updates.',
    quizReference: 'Question 11'
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
