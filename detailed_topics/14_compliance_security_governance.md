# 🔒 Compliance, Security & Governance in AI/ML

Securing machine learning applications is critical. AWS organizes security boundaries using two distinct frameworks: the **Shared Responsibility Model for Machine Learning** and the **Generative AI Security Scoping Matrix**.

---

## 1. 🏢 Shared Responsibility Model: Renting vs. Booking

The Shared Responsibility Model for Machine Learning defines who manages the infrastructure (networking, hardware, and OS) and who manages the software (libraries, training scripts, and datasets). AWS categorizes these boundaries across five operational scopes.

Let $S \in \{1, 2, 3, 4, 5\}$ represent the scope level in the Shared Responsibility Model. The level of customer responsibility, denoted as $R(S)$, decreases as the scope level increases, which can be represented formally as:
$$R(S) \propto \frac{1}{S}$$

*   **Scope 1 (Infrastructure-Managed - Amazon EC2):** Think of this like buying raw land. You are responsible for building the house, securing the doors, installing an alarm system, and patching the roof.
    *   *Customer Responsibility:* You manage the operating system, GPU drivers, PyTorch or TensorFlow libraries, training scripts, and API endpoints.
    *   *AWS Responsibility:* AWS manages physical security of the data center, virtualization layers, and server hardware.
    *   *Scope 1 Example:* A developer deploys custom neural network models on Amazon EC2 `g5.xlarge` instances. The developer must manually run Linux OS updates, install NVIDIA CUDA drivers, compile Docker containers, and handle api security policies.
*   **Scope 2 (Platform-Managed - Amazon SageMaker):** Think of this like renting a house. The landlord (AWS) handles the building structure, plumbing, and roof.
    *   *Customer Responsibility:* You manage your Python scripts, model hyperparameters, dataset structures, and notebook directory access permissions.
    *   *AWS Responsibility:* AWS manages the host operating system, Docker base container images, and the platform clustering infrastructure.
    *   *Scope 2 Example:* An engineer spins up a SageMaker Notebook instance. AWS provides the pre-patched Jupyter environment and operating system. The engineer is responsible for writing the custom training script and configuring IAM policies to restrict notebook access.
*   **Scope 3 (Built-In Algorithms - SageMaker Built-in):** Think of this like renting a fully furnished apartment.
    *   *Customer Responsibility:* You manage hyperparameter settings and target datasets.
    *   *AWS Responsibility:* AWS manages the training algorithm code, container execution, and underlying host scaling.
    *   *Scope 3 Example:* An analyst runs a classification training job using the built-in SageMaker XGBoost algorithm. AWS manages the container code and training logic. The analyst only points the job to their S3 dataset and sets hyperparameters, including `max_depth` and `learning_rate`.
*   **Scope 4 (Managed AI - Amazon Rekognition / Comprehend):** Think of this like booking a hotel room. You just bring your personal bags.
    *   *Customer Responsibility:* You manage configuring IAM API key access policies and securing the raw data payload sent to the service.
    *   *AWS Responsibility:* AWS manages the pre-trained model weights, host operating systems, scaling engines, and API endpoints.
    *   *Scope 4 Example:* An application sends image files to the Amazon Rekognition `DetectLabels` API. AWS is responsible for maintaining the vision model and scaling the API. The developer is responsible for restricting which IAM users can execute the API call.
*   **Scope 5 (SaaS-Like - Amazon Bedrock):** Think of this like staying in a luxury suite.
    *   *Customer Responsibility:* You manage user prompts, fine-tuning datasets, Guardrails, and KMS encryption keys.
    *   *AWS Responsibility:* AWS manages foundation model weights, isolated GPU clusters, and model hosting.
    *   *Scope 5 Example:* A developer calls Claude 3 via Amazon Bedrock serverless APIs. AWS handles the execution environment and base weights. The developer is responsible for protecting fine-tuning datasets in S3 and configuring safety filters.

> [!WARNING]
> **Scope Confusion Gotcha:** AWS has two distinct 5-scope frameworks in AI/ML security: the **Shared Responsibility Model for Machine Learning** (which categorizes who manages the infrastructure vs software) and the **Generative AI Security Scoping Matrix** (which categorizes how an enterprise deploys models). Do not confuse them!

---

## 2. 🔛 Generative AI Security Scoping Matrix

The Generative AI Security Scoping Matrix is a risk management framework defined by AWS to classify organizational boundaries based on how an enterprise deploys generative AI:

*   **Scope 1 (Consumer Applications):** Accessing public, third-party GenAI applications (for example, public chatbots or translation websites).
    *   *Security Responsibility:* Direct user responsibility. You must formulate corporate usage guidelines, enforce acceptable use policies, and block users from inputting proprietary source code or customer data.
    *   *Scope 1 Example:* An employee uses a public writing assistant to draft a report. If they paste customer social security numbers into the prompt, that data could be absorbed into the vendor's training loop, causing a compliance breach.
*   **Scope 2 (Enterprise Applications):** Using third-party enterprise-grade applications with enterprise data agreements (for example, enterprise chatbots with data privacy terms).
    *   *Security Responsibility:* Enforce IAM access controls, verify vendor security agreements, and audit internal data flows.
    *   *Scope 2 Example:* A company signs an enterprise contract for Amazon Q Business. The data privacy agreement guarantees prompts are not used for model training, but the security team must configure IAM and Single Sign-On (SSO) to make sure employees can only query files they are authorized to see.
*   **Scope 3 (Pre-trained Models - APIs/RAG):** Building custom applications by integrating pre-trained foundation models via APIs or Retrieval-Augmented Generation (RAG).
    *   *Security Responsibility:* Secure API endpoints, encrypt vector databases, configure network boundaries, and manage input/output filtering.
    *   *Scope 3 Example:* A developer builds a customer service bot by calling the Amazon Bedrock Claude API and querying a vector database in Amazon OpenSearch Serverless. The developer must restrict access to the API key, secure the OpenSearch endpoint, and run input/output guardrails.
*   **Scope 4 (Fine-tuned Models):** Customizing pre-trained foundation models on custom internal datasets.
    *   *Security Responsibility:* Secure training data pipelines, isolate fine-tuning compute nodes, and govern data access permissions.
    *   *Scope 4 Example:* A bank fine-tunes a Titan model on 10 years of mortgage audit reports. The bank must restrict S3 read access to the training dataset, secure the compute instances running the fine-tuning job, and ensure the resulting model weights are encrypted using a customer-managed KMS key.
*   **Scope 5 (Self-trained Models):** Training a proprietary foundation model from scratch.
    *   *Security Responsibility:* Full end-to-end security responsibility (raw data curation, compute infrastructure, model weights protection, and output filters).
    *   *Scope 5 Example:* A research organization trains a 100-billion parameter chemistry model from scratch on EC2 UltraClusters containing thousands of GPUs. The organization must curate and clean terabytes of raw molecular data, manage high-performance networking, and secure the final model weights.

---

## 3. 🛡️ Securing Your Models and Data Channels

To keep your training data and model assets secure on AWS:

*   **AWS PrivateLink:** Establishes private Virtual Private Cloud (VPC) endpoints. This routes API traffic directly from your VPC to Bedrock or SageMaker without traversing the public internet, protecting data from network snooping.
    *   *PrivateLink Example:* An application running on an EC2 instance inside a private subnet queries a Bedrock model. By configuring a VPC endpoint for Bedrock, the request travels entirely within the AWS backbone network, never touching the public internet.
*   **AWS KMS (Key Management Service):** Encrypts model assets, dataset volumes, and S3 buckets at rest using customer-managed cryptographic keys.
    *   *KMS Example:* When configuring a SageMaker training job, you supply a KMS Key ARN. SageMaker uses this key to decrypt input data from S3, encrypt the temporary storage volume on the training instance, and encrypt the final model artifact before uploading it back to S3.
*   **Data Privacy Policy:** AWS policies guarantee that your fine-tuning datasets and prompt inputs on Amazon Bedrock are never used to train or improve the base foundation models. Your data remains isolated within your account boundary.
    *   *Data Privacy Example:* A hospital inputs patient histories into a Bedrock model to generate summaries. AWS guarantees that these histories are not processed by third-party model providers, nor are they used to update the weights of public models.

---

## 4. 📜 Compliance Frameworks & Global Standards

When building systems in regulated industries, you must meet compliance standards:

*   **ISO/IEC 42001:** The international standard specifying requirements for establishing, implementing, maintaining, and continually improving an **Artificial Intelligence Management System (AIMS)** within organizations.
    *   *ISO/IEC 42001 Example:* A startup documents its AI model development, bias testing, and risk logs to achieve ISO/IEC 42001 certification, proving to enterprise clients that its software is developed and managed safely.
*   **Algorithmic Accountability Act:** Proposed US federal legislation requiring companies to conduct impact assessments of automated decision-making systems (including AI/ML models) for bias, safety, privacy, and security.
    *   *Algorithmic Accountability Act Example:* A hiring platform must run regular bias audits and impact assessments to prove its resume-screening algorithm does not discriminate against applicants based on demographic attributes.
*   **HIPAA (Health Insurance Portability and Accountability Act):** Enforces strict encryption and audit logs for protected health information.
    *   *HIPAA Example:* An app summarizing doctor-patient calls must encrypt the audio transcripts in S3 using KMS keys, route API calls via AWS PrivateLink, and capture every API request in AWS CloudTrail for auditing.
*   **GDPR (General Data Protection Regulation):** Enforces user data deletion rules (right to be forgotten) and controls data residency locations.
    *   *GDPR Example:* A retail chatbot operating in the EU must route data only to the `eu-west-1` (Dublin) region and implement a system to delete a user's prompt history from the database if they request it.

---

## 5. 📊 Shared Responsibility Matrix

| Scope Level | Customer Configuration | AWS Security | Primary Use Case |
| :--- | :--- | :--- | :--- |
| **Scope 1 (EC2)** | OS patching, CUDA drivers, container security. | Physical hardware security. | Bespoke neural network architectures. |
| **Scope 2 (SageMaker)** | Training scripts, Python libraries, IAM access. | Notebook host OS, platform scaling. | Custom training runs using PyTorch. |
| **Scope 3 (Built-in)** | Dataset paths, hyperparameter values. | Algorithm code container, hosting OS. | Out-of-the-box model training. |
| **Scope 4 (Comprehend)** | Input data payloads, API keys, IAM access. | Model weights, host OS, scaling. | Out-of-the-box text classification. |
| **Scope 5 (Bedrock)** | Prompts, fine-tuning datasets, KMS keys. | Foundation model weights, host OS. | Deploying Claude or Llama model endpoints. |

---

## 6. 📊 Generative AI Security Scoping Matrix

| Scope | Category | Description | Security Responsibility |
| :--- | :--- | :--- | :--- |
| **Scope 1** | **Consumer Applications** | Accessing public, third-party GenAI applications (e.g., public chatbots). | Direct user responsibility. Formulate usage guidelines; enforce acceptable use policies; monitor data input to prevent leaking corporate secrets. |
| **Scope 2** | **Enterprise Applications** | Using third-party enterprise-grade applications with enterprise data agreements. | Enforce IAM access controls; verify vendor security agreements; audit data flows. |
| **Scope 3** | **Pre-trained Models (APIs/RAG)** | Building custom applications by integrating third-party foundation models via APIs or Retrieval-Augmented Generation (RAG). | Secure the API endpoints; encrypt vector databases; configure network boundaries; manage data input/output filtering. |
| **Scope 4** | **Fine-tuned Models** | Customizing pre-trained foundation models on custom internal datasets. | Secure training data pipelines; isolate fine-tuning compute; govern data access permissions. |
| **Scope 5** | **Self-trained Models** | Training a proprietary foundation model from scratch. | Full end-to-end security responsibility (raw data curation, compute infrastructure, model weights protection). |
