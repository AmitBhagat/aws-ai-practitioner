import os

output_dir = r"e:\Projects\aws-ai-practitioner\detailed_topics"
os.makedirs(output_dir, exist_ok=True)

# 01_exam_metrics.md
with open(os.path.join(output_dir, "01_exam_metrics.md"), "w", encoding="utf-8") as f:
    f.write(r"""# 📊 AWS Certified AI Practitioner (AIF-C01): Scoring, Metrics, and What to Expect

Are you preparing for the **AWS Certified AI Practitioner (AIF-C01)** exam? This certification checks your ability to design, build, and secure artificial intelligence and machine learning systems on the AWS platform. 

Instead of asking you to memorize facts, this exam tests your hands-on judgment. It evaluates how well you can build model pipelines, select cost-effective instances, and secure model deployments.

---

## 1. 🎯 How the Scoring System Works
Think of the AIF-C01 scoring system like scoring in a gymnastics or diving competition. Judges do not just add up raw points. Instead, they adjust the final score based on how difficult the moves were. This is what AWS calls a **scaled scoring model**.

AWS maps your raw score (the percentage of questions you got right) onto a standard scale that runs from **100 to 1000**. To pass the exam, you need to score at least **700**.

> [!TIP]
> **Real-World Analogy:** Imagine scoring a diving match. A simple dive done perfectly might get a lower score than a highly complex double-flip dive done with a slight splash. Similarly, AWS adjusts your score based on the statistical difficulty of the specific questions on your exam form.

*   **Raw Score vs. Scaled Score:** Your raw score is the percentage of questions you answered correctly, including getting $45$ out of $50$ questions right. A scaled score adjustments process recalculates this raw score. It takes into account the difficulty of the specific exam version you received. This ensures that a score of $700$ represents the same level of knowledge, whether your exam version was easy or hard.
*   **Keeping Your Credential Active:** Once you pass, your certification is active for exactly **36 months** (3 years). To keep it active, you must recertify. You can do this by passing the updated version of the same exam, or by passing a higher-level exam, including the AWS Certified Machine Learning - Specialty or the Machine Learning Associate exam.

---

## 2. ⚙️ The Psychometric Engine Under the Hood
To make sure the exam is fair, AWS uses a statistical framework called **Item Response Theory (IRT)**. 

### Item Response Theory (IRT)
IRT is a statistical method that calculates how likely a candidate of a certain ability level is to answer a specific question correctly. Under the hood, AWS uses a three-parameter logistic (3PL) formula to evaluate each question:
$$P_i(\theta) = c_i + \frac{1 - c_i}{1 + e^{-a_i(\theta - b_i)}}$$

> [!NOTE]
> **Jargon Buster:**
> *   **Latent Ability ($\theta$):** This represents your actual, hidden level of knowledge in AI and ML on AWS.
> *   **Difficulty Parameter ($b_i$):** This is the point on the ability scale where a candidate has a $50\%$ chance of getting the question right. Highly complex tasks, including setting up multi-account IAM security boundaries for Bedrock agents, have a high difficulty value.
> *   **Discrimination Parameter ($a_i$):** This measures how well a question separates candidates who know the topic from those who are guessing.
> *   **Guessing Parameter ($c_i$):** This is the probability that a candidate can get the question right simply by picking a random answer.

### Scored vs. Unscored Questions
When you sit down to take the test, you will face **65 questions**. However, they do not all count toward your final score:
*   **Scored Questions (50 items):** These are fully tested questions that determine your final scaled score.
*   **Unscored Questions (15 items):** These are experimental questions mixed in throughout the exam. Think of them like beta tests. AWS uses them to gather statistical data and see how candidates perform before using them as real scored questions in future exams. They also help identify cheating patterns, including when a candidate gets highly difficult experimental questions right but misses basic questions.

---

## 3. 🖥️ Exam Registration and Console Settings
Here are the administrative parameters you need to configure when registering for your test:

*   **Test Provider:** **Pearson VUE** is the exclusive administrator for AWS certifications. You can choose to take the test at a local test center or online at home.
*   **Active Time Limit:** You have exactly **120 minutes** (2 hours) to answer the questions. This gives you about $1.84$ minutes per question, so keep an eye on the clock.
*   **Total Seat Time:** Set aside **150 minutes** in your schedule. The extra 30 minutes are for check-in tasks:
    1.  Verifying your identity with the online proctor and running a 360-degree webcam scan of your desk space.
    2.  Running system checks to ensure your internet connection has at least $3\text{ Mbps}$ upload and download speeds.
    3.  Reading and agreeing to the **AWS Certification Candidate Agreement (NDA)**.
    4.  Filling out the survey at the very end of the exam.
*   **The NDA Time Trap:** When the exam starts, you have a strict **5-minute** window to accept the NDA. If you let this timer run out, your exam terminates immediately. You will fail the exam and lose your registration fee.

> [!WARNING]
> **NDA Deadline:** If you miss the 5-minute NDA screen window, Pearson VUE will automatically boot you from the proctored application, record a failing mark, and forfeit your payment.

---

## 4. 📝 Question Formats Explained

The exam uses five distinct question layouts to test your knowledge:

| Question Type | How It Works | What It Tests |
| :--- | :--- | :--- |
| **Multiple Choice** | You choose $1$ correct answer out of $4$ options. | Testing single services, including picking Amazon Polly to convert text to speech. |
| **Multiple Response** | You choose $2$ or more correct answers from a list of $5$ or more options. | Testing design decisions, including selecting Amazon S3 and AWS PrivateLink for secure model logs. |
| **Ordering** | You drag and drop steps in the correct chronological order. | Pipeline workflows, including sequencing the phases of a SageMaker Pipeline or a Glue ETL job. |
| **Matching** | You match terms to their correct definitions. | Terminology, including matching performance metrics to their mathematical definitions. |
| **Case Studies** | You read a business scenario and answer a group of related questions. | Enterprise migrations, including balancing cost, latency, and compliance requirements for a generative AI system. |
""")

# 02_foundational_concepts.md
with open(os.path.join(output_dir, "02_foundational_concepts.md"), "w", encoding="utf-8") as f:
    f.write(r"""# 🧠 The Core Concepts of AI, ML, Deep Learning & Generative AI

If you are new to the world of artificial intelligence, the terminology can feel overwhelming. Let us break down the core concepts you need to know for the AWS Certified AI Practitioner exam.

---

## 1. 🪆 The Russian Doll of AI
Think of Artificial Intelligence, Machine Learning, Deep Learning, and Generative AI like a set of nesting Russian dolls. Each concept sits inside the other.

```mermaid
graph TD
    classDef ai fill:#2c3e50,stroke:#fff,stroke-width:2px,color:#fff;
    classDef ml fill:#16a085,stroke:#fff,stroke-width:2px,color:#fff;
    classDef dl fill:#2980b9,stroke:#fff,stroke-width:2px,color:#fff;
    classDef genfill fill:#8e44ad,stroke:#fff,stroke-width:2px,color:#fff;

    AI["🧠 Artificial Intelligence (AI)"]:::ai --> ML["🤖 Machine Learning (ML)"]:::ml
    ML --> DL["🕸️ Deep Learning (DL)"]:::dl
    DL --> Gen["🎨 Generative AI (GenAI)"]:::genfill
```

*   **Artificial Intelligence (AI):** This is the largest, outermost doll. It represents any computer system designed to mimic human behavior, including making decisions or solving problems.
*   **Machine Learning (ML):** This doll sits inside AI. Instead of writing rigid, hard-coded rules, we feed data into statistical models. The model learns how to map features ($X$) to labels ($Y$) by adjusting its weights ($w$):
    $$f(X; w) \approx Y$$
    Under the hood, we optimize these weights using a framework called **Empirical Risk Minimization (ERM)**:
    $$\min_{w} \frac{1}{N} \sum_{i=1}^N L(f(x_i; w), y_i)$$

> [!NOTE]
> **Jargon Buster:** **Empirical Risk Minimization** is just a fancy way of saying "make the model as accurate as possible by minimizing its mistakes on the training data."

*   **Deep Learning (DL):** This doll sits inside ML. It uses **Artificial Neural Networks (ANNs)** with three or more hidden layers. These layers automatically extract features from raw data, so you do not have to clean or prepare features by hand.
*   **Generative AI (GenAI):** The smallest doll at the center. It uses deep learning models to estimate the probability distribution $P(X, Y)$ of a dataset. This enables the model to create brand new, realistic data points that look like the training data.

---

## 2. 📡 How AI Processes Different Modalities
How do models actually process the world? Let us look at the difference between simulating human outputs and emulating biological brain pathways:

*   **Simulation:** Today's models *simulate* human intelligence. They run statistical calculations to predict the next word or pixel. They do not understand meaning; they compute mathematical probabilities.
*   **Emulation:** This would be physically replicating the biological wiring of a human brain, including chemical synapses. Today's AI does not do this; it relies on matrix multiplication.

> [!TIP]
> **Modality Analogy:** Think of modalities like the raw materials that enter a factory. Depending on whether you receive wood (text), steel (images), liquid (audio), or wire (molecules), you need a completely different processing machine.

Here is how different data types, or **modalities**, are processed by specific architectures:

1.  **Text:** We convert text into numbers using tokenization, turn those numbers into dense vectors, and pass them to **Transformers**. These models use attention mechanisms to map relationships between words in a sentence.
2.  **Images:** We treat images as large grids of pixel values. Traditional ML uses **Convolutional Neural Networks (CNNs)**, which slide small math filters over the image to detect edges and shapes. Modern image generators use **Diffusion Models** to build images by removing noise from random pixel grids.
3.  **Audio:** Sound waves are translated into two-dimensional pictures called spectrograms. These show how frequencies change over time and are processed using recurrent networks or wave-synthesis models, including WaveNet.
4.  **Molecules:** Biological data, including proteins, is modeled as a network of connected points. **Graph Neural Networks (GNNs)** treat atoms as nodes and chemical bonds as edges to predict how proteins fold and interact.

---

## 3. ⚡ Picking the Right Compute Instance on AWS
Deep learning requires massive computing power. Here is how to select the right EC2 instance size in the AWS console:

*   **Standard Compute Instances (CPU):** Best for classical machine learning, including linear regression and K-Means clustering. These models run efficiently on basic instance families, including `ml.m5.large`.
*   **Accelerated Compute Instances (GPU):** Required for training neural networks and running generative AI models. The GPU VRAM (video memory) acts as a high-speed sandbox that holds model parameters during math operations.
    *   `ml.g4dn.xlarge` (NVIDIA T4, $16\text{ GB}$ VRAM): Best for hosting small classification models and running real-time inference.
    *   `ml.g5.2xlarge` (NVIDIA A10G, $24\text{ GB}$ VRAM): The sweet spot for running training experiments and fine-tuning models.
    *   `ml.p4de.24xlarge` (8x NVIDIA A100, $640\text{ GB}$ VRAM): Required for massive pre-training workloads and distributed training jobs.

> [!WARNING]
> **SageMaker Canvas Cost Trap:** SageMaker Canvas charges a flat fee of **$1.90 per hour** to keep your visual workspace running. Closing your browser tab does not turn off the instance. You must explicitly click the log out button in the bottom-left corner of the interface to stop the bill.

---

## 4. 📊 Feature Comparison: Classic ML vs. Generative AI

| Feature | Classical AI / ML | Generative AI |
| :--- | :--- | :--- |
| **Mathematical Goal** | Discriminative: Models $P(Y \vert X)$ to classify data or predict numbers. | Generative: Models $P(X, Y)$ or $P(X)$ to create new data. |
| **Compute Profile** | Runs on low-cost CPUs or single GPUs. | Requires high-performance GPU clusters for training and inference. |
| **Feature Extraction** | Requires manual data cleaning and feature engineering. | Model automatically learns features from raw inputs. |
| **AWS Services** | SageMaker Autopilot, SageMaker XGBoost, Amazon Lex. | Amazon Bedrock, Amazon Q, SageMaker JumpStart. |
| **Use Case** | Predicting credit card fraud based on transaction history. | Generating a customer service email response based on a complaint. |
""")

# 03_nlp.md
with open(os.path.join(output_dir, "03_nlp.md"), "w", encoding="utf-8") as f:
    f.write(r"""# 🪵 Building an NLP Pipeline: From Raw Text to Semantic Meaning

**Natural Language Processing (NLP)** is the science of helping computers read, write, and understand human language. Since computers only understand numbers, the core challenge of NLP is turning unstructured text strings into structured, fixed-size lists of numbers called **vector embeddings**.

---

## 1. ⚙️ Step-by-Step: The NLP Pipeline
Think of the NLP pipeline like an industrial timber mill. You feed in rough, irregular logs of raw text, strip off the bark, clean the wood, and slice it into standardized planks that are easy to build with.

```mermaid
graph LR
    classDef steps fill:#d5f5e3,stroke:#27ae60,stroke-width:2px,color:#000;
    Raw["🪵 Raw Text"] --> Norm["🧹 Normalization"]:::steps
    Norm --> Token["✂️ Tokenization"]:::steps
    Token --> Stem["🌱 Lemmatization"]:::steps
    Stem --> Parse["🔗 Syntactic Parsing"]:::steps
    Parse --> Embed["📊 Vector Embeddings"]:::steps
```

### Phase 1: Pre-processing & Data Wrangling
Before feeding text to a model, we must clean it up:
*   **Normalization:** Converting all characters to lowercase and stripping out accents or diacritics.
*   **Contraction Expansion:** Converting words, including converting `"don't"` to `"do not"`, to keep your grammar consistent.
*   **Sanitization:** Removing HTML tags, emojis, and non-ASCII characters from the text.
*   **Stop Word Removal:** Deleting common words, including `"the"`, `"and"`, and `"is"`, to shrink your vocabulary.
    > [!WARNING]
    > **Stop Word Gotcha:** Do not remove stop words if you are training sentiment analysis models or generative LLMs. Removing words, including `"not"` or `"no"`, completely flips the meaning of a sentence (for example, `"not happy"` becomes `"happy"`).
*   **Stemming:** A crude, rule-based approach that chops off the ends of words. For example, `"connecting"`, `"connected"`, and `"connection"` all get hacked down to the stem `"connect"`. It is fast but can create non-dictionary words.
*   **Lemmatization:** A smart, linguistic approach that looks up words in a dictionary to find their base form, which is known as the **lemma**. For example, `"better"` maps to `"good"`, and `"running"` maps to `"run"`.

> [!TIP]
> **Pruning Analogy:** Think of Stemming like a landscaper roughly hacking branches off a tree with a chainsaw. It is fast, but messy. Lemmatization is like a botanist identifying the exact root structure of the plant and gently pruning it to its base form.

### Phase 2: Natural Language Understanding (NLU) & Syntax
Once the text is clean, we analyze how the words fit together:
*   **Part-of-Speech (POS) Tagging:** Labeling each token as a noun, verb, adjective, or other grammatical category.
*   **Chunking:** Grouping words together into meaningful phrases, including noun phrases.
*   **Dependency Parsing:** Drawing a graph of arrows that show how words grammaticaly rely on one another.
*   **Constituency Parsing:** Breaking a sentence down into nested sub-phrases based on structure rules.

### Phase 3: Extracting Business Value
Now we can run downstream NLP tasks:
*   **Named Entity Recognition (NER):** Spotting and labeling key nouns, including identifying names of people, companies, locations, or Personally Identifiable Information (PII).
*   **N-grams:** Splitting text into contiguous groups of $n$ words to catch context, including $2$-grams or $3$-grams.
*   **Sentiment Analysis:** Scanning text to classify the emotional tone, including labeling it Positive, Negative, Neutral, or Mixed.
*   **Targeted Sentiment:** Finding the sentiment toward specific features. For example, in the phrase "The screen is beautiful but the battery is bad," the model records positive sentiment for "screen" and negative sentiment for "battery."
*   **Topic Modeling:** Grouping large collections of documents into topics based on how often words appear together.

---

## 2. 🛜 Using AWS Managed NLP Services
AWS offers serverless APIs that let you run NLP workflows without training models yourself:

*   **Amazon Comprehend:** A serverless NLP engine.
    *   *Billing Unit:* Billed in units of **100 characters** (minimum charge is 1 unit per request).
    *   *Core APIs:* `DetectDominantLanguage`, `DetectEntities`, `DetectKeyPhrases`, `DetectPiiEntities`, `DetectSentiment`.
*   **Amazon Kendra:** An enterprise search engine that uses ML to read your documents.
    *   *Connectors:* Automatically index folders in Amazon S3, Salesforce, SharePoint, and databases.
    *   *Cost Trap:* Default API deployments provision the **Enterprise Edition ($1.40/hour)**. Make sure to select the Developer Edition for development environments to save money.
*   **Amazon Translate:** Real-time translation.
    *   *Terminology Files:* You can upload custom CSV or TMX files to S3 to stop the model from translating brand names literally (for example, translating "Amazon Web Services" into local words for a rainforest).

---

## 3. 📊 Tool Selection: Stemming vs. Lemmatization

| Metric | Stemming | Lemmatization |
| :--- | :--- | :--- |
| **Mechanism** | Simple rule-based chopping. | Dictionary and morphology lookup. |
| **Output Quality** | Can produce non-words, including `"arguing"` mapping to `"argu"`. | Always returns a valid dictionary base word, including `"arguing"` mapping to `"argue"`. |
| **Processing Speed** | Extremely fast with low memory usage. | Slower; requires parsing grammar and dictionary lookups. |
| **Primary Use Case** | Building fast search indexes. | Preparing inputs for translation, conversational bots, and LLMs. |
""")

# 04_traditional_ml.md
with open(os.path.join(output_dir, "04_traditional_ml.md"), "w", encoding="utf-8") as f:
    f.write(r"""# 🤖 The Three Types of Machine Learning

Machine learning models learn patterns from data by updating their parameters. Before diving into specific algorithms, let us look at the three main styles of machine learning.

---

## 1. 🚸 Supervised, Unsupervised, and Reinforcement Learning
Here is a simple way to remember the differences between the three learning types:

*   **Supervised Learning:** Think of this like studying for a test using flashcards that have the question on the front and the answer on the back. The model looks at features ($X$), makes a guess ($\hat{Y}$), checks the true answer ($Y$), and adjusts itself to minimize the error.
*   **Unsupervised Learning:** Think of this like sorting a giant pile of unsorted laundry. You do not have labels or categories. Instead, you look at the items and group them by similarities, including putting shirts in one pile and socks in another.
*   **Reinforcement Learning:** Think of this like training a dog. There is no historical dataset. Instead, the agent interacts with its environment, performs actions, and learns from rewards (treats) or penalties (ignoring bad behavior).

---

## 2. 🔄 Loops and Optimization Mechanics
How do these systems actually learn? They run in continuous feedback loops:

```mermaid
graph TD
    classDef agent fill:#f9e79f,stroke:#f1c40f,stroke-width:2px,color:#000;
    classDef env fill:#a9dfbf,stroke:#27ae60,stroke-width:2px,color:#000;

    A["🤖 Agent"]:::agent -- "Action (a_t)" --> E["🌍 Environment"]:::env
    E -- "Reward (r_t+1) & State (s_t+1)" --> A
```

*   **Supervised Feedback Loop:** The model uses features ($X$) to predict a target ($\hat{Y}$). The **Loss Function** measures the error between the prediction and the ground truth. An **Optimizer** calculates gradients and updates parameters to minimize that loss.
*   **Unsupervised Clustering Loop:** Algorithms, including K-Means, place cluster centers (centroids) in vector space. They assign data points to the closest centroid based on distance, and then recalculate the centroid positions. They repeat this loop until the centroids stop moving.
*   **Reinforcement Learning Loop:** The **Agent** looks at the current **State** ($s_t$) of the **Environment**. It chooses an **Action** ($a_t$) based on its **Policy** ($\pi$). The environment returns a **Reward** ($r_{t+1}$) and transitions to the next state ($s_{t+1}$). The goal is to maximize the expected discounted return over time:
    $$G_t = \sum_{k=0}^{\infty} \gamma^k r_{t+k+1}$$

> [!NOTE]
> **Jargon Buster:** **Discount Factor ($\gamma$)** is a value between $0$ and $1$ that determines how much the model values immediate rewards versus long-term rewards. If it is close to $0$, the model is short-sighted; if it is close to $1$, it cares about long-term payoffs.

---

## 3. 📂 Setting Up Datasets on AWS
When training models on AWS, you must configure your data input channels correctly:

*   **SageMaker Training Jobs:** Require you to point your estimator to S3 data channels, including Train, Validation, and Test. Once training completes, SageMaker packages the parameters into a `model.tar.gz` archive in S3.
*   **SageMaker Ground Truth:** A managed service for labeling raw datasets.
    *   *Input Format:* Uses a JSON Lines (`.jsonl`) manifest file. Each line must be a JSON object with a `"source"` (for raw text) or a `"source-ref"` (pointing to an image in S3).
    *   *Size Limits:* Individual JSON lines must not exceed **100,000 characters**, and no single attribute can be larger than **20,000 characters**.
    *   *CORS Rule:* The S3 bucket holding your files must have Cross-Origin Resource Sharing (CORS) enabled. If you do not set this up, web browsers will block the labeling team from viewing your images.

---

## 4. 📊 Paradigm Comparison Matrix

| Attribute | Supervised Learning | Unsupervised Learning | Reinforcement Learning |
| :--- | :--- | :--- | :--- |
| **Data Format** | Labeled: $(X, Y)$ pairs. | Unlabeled: Features $X$ only. | No static dataset; learns via active environment feedback. |
| **Mathematical Goal** | Minimize prediction error: $L(Y, f(X))$. | Maximize cluster separation. | Maximize expected cumulative reward: $E[\sum \gamma^t r_t]$. |
| **AWS Services** | SageMaker XGBoost, SageMaker Linear Learner. | SageMaker K-Means, SageMaker PCA. | AWS DeepRacer. |
| **Primary Use Case** | Predicting customer churn (Yes/No). | Segmenting customers into $5$ buying groups. | Directing an autonomous robot to navigate a warehouse floor. |
""")

# 05_traditional_ml_algorithms.md
with open(os.path.join(output_dir, "05_traditional_ml_algorithms.md"), "w", encoding="utf-8") as f:
    f.write(r"""# 📈 Traditional ML Algorithms: From Trendlines to Hyperplanes

Traditional machine learning algorithms are the workhorses of data science. Before deep learning took over, these math-based models were used to draw boundaries, group data points, and make predictions on structured, tabular data. They are fast, cost-effective, and highly interpretable.

---

## 1. 📏 Regression: Predicting Numbers
Think of regression like drawing a trendline on a scatter plot of data. The goal is to find a line or curve that sits as close as possible to all your data points:

*   **Simple Linear Regression:** Fits a straight line to minimize the sum of squared errors between predictions and actual values:
    $$Y = \beta_0 + \beta_1 X + \epsilon$$
    where $\beta_0$ represents the intercept, $\beta_1$ is the slope coefficient, and $\epsilon$ represents the random error. The model uses Ordinary Least Squares (OLS) to find the best line.
*   **Multiple Linear Regression:** Extends the trendline to handle multiple features:
    $$Y = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \dots + \beta_n X_n + \epsilon$$
    Instead of a flat line, it calculates a multi-dimensional hyperplane of best fit.
*   **Polynomial Regression:** Models curved relationships by adding exponential terms of your features:
    $$Y = \beta_0 + \beta_1 X + \beta_2 X^2 + \dots + \beta_k X^k + \epsilon$$
    This allows a linear model to capture curves, including acceleration trends.
*   **Support Vector Regression (SVR):** Think of this like building a paved road of a certain width, known as the $\epsilon$-insensitive tube. SVR tries to fit as many data points as possible *inside* this road, and it only penalizes points that fall outside the boundaries.

---

## 2. 🔀 Classification: Drawing Boundaries
Classification is the process of drawing walls or boundaries to separate data into categories:

*   **Logistic Regression:** Think of this like a light switch with a dimmer. It maps real-valued inputs to a probability between $0$ and $1$ using the sigmoid function:
    $$P(Y=1 \vert X) = \sigma(z) = \frac{1}{1 + e^{-z}}$$
    where $z = w^T x + b$. If the probability is above a threshold, including $0.5$, we assign the sample to the positive class.
*   **K-Nearest Neighbors (KNN):** Think of this like asking your nearest neighbors for advice. To classify a point, KNN finds the $k$ closest samples in your training set and takes a majority vote. The distance is calculated using:
    *   *Euclidean Distance:* $d(x, y) = \sqrt{\sum (x_i - y_i)^2}$
    *   *Manhattan Distance:* $d(x, y) = \sum \vert x_i - y_i \vert$
    *   *Hamming Distance:* $d(x, y) = \sum \mathbb{I}(x_i \neq y_i)$, which counts the number of differences between categorical values.
*   **Support Vector Machine (SVM):** Finds the widest street that separates two classes of data points. If the classes are mixed together, it uses the **kernel trick** to project the data into a higher dimension where they can be separated by a flat plane. A popular option is the Radial Basis Function (RBF) kernel:
    $$K(x, y) = \exp(-\gamma \|x - y\|^2)$$

> [!TIP]
> **Kernel Analogy:** Imagine putting blue and red marbles on a table, all mixed up. You cannot draw a straight line to separate them. But if you hit the table from underneath so they bounce up into the air (a higher dimension), you could easily slide a sheet of paper (a hyperplane) between them.

*   **Decision Tree:** Works like a game of $20$ Questions. It splits data at feature thresholds to maximize the purity of the resulting groups.
    *   *Entropy:* $H(S) = -\sum p_i \log_2 p_i$ (measures randomness).
    *   *Gini Impurity:* $G(S) = 1 - \sum p_i^2$ (measures classification error probability).
    *   *Information Gain:* $IG(S, A) = H(S) - \sum \frac{|S_v|}{|S|} H(S_v)$ (measures the reduction in randomness after a split).
*   **Random Forest:** An ensemble method that trains a crowd of decision trees on random subsets of the data and features. It takes the average prediction of the trees to reduce variance.
*   **Naive Bayes:** Calculates probability using Bayes' Theorem:
    $$P(\text{Class} \vert \text{Features}) \propto P(\text{Class}) \prod P(\text{Feature}_i \vert \text{Class})$$
    It is called "naive" because it assumes all features are completely independent of each other.

---

## 3. 👥 Clustering: Grouping Unlabeled Data
Clustering groups unlabeled data points based on spatial closeness:

*   **K-Means:** Partitions data into $K$ groups. It initializes $K$ center points (centroids), assigns each data point to its closest centroid using Euclidean distance, and recalculates the centroid coordinates as the average of the group. The loop runs until centroids stop shifting.
    > [!WARNING]
    > **Centroid Distortion:** Outliers can pull centroids far away from their true groups. You must define $K$ in advance, which is typically found by plotting within-cluster variance and finding the "elbow" point.
*   **DBScan:** Groups points based on local density. It looks for core points that have a minimum number of neighbors (`minSamples`) within a specified radius (`eps`). Points that are isolated are marked as noise.
*   **K-Modes:** An extension of K-means designed for categorical data, using modes and matching distance metrics instead of averages and Euclidean distance.

---

## 4. 🗜️ Dimensionality Reduction
*   **PCA (Principal Component Analysis):** Projects multi-dimensional data onto orthogonal axes that capture the highest variance. Think of it like taking a $2\text{D}$ photograph of a $3\text{D}$ object from an angle that keeps the most detail.
*   **SVD (Singular Value Decomposition):** Decomposes a matrix $A$ into three matrices $U \Sigma V^T$ to extract core structures, which is useful for recommendation engines.
*   **LDA (Linear Discriminant Analysis):** A supervised method that reduces dimensions while maximizing class separation.

---

## 5. 📊 Tool Selection: K-Means vs. DBScan vs. PCA

| Metric | K-Means | DBScan | PCA |
| :--- | :--- | :--- | :--- |
| **Goal** | Group data into spherical clusters. | Find clusters of arbitrary shapes. | Reduce the number of features. |
| **Key Settings** | Number of clusters ($K$). | Search radius (`eps`), density limit (`minSamples`). | Number of principal components. |
| **Outliers** | Sensitive; outliers pull centroids. | robust; filters outliers as noise. | retains outliers but projects variance. |
| **Use Case** | Grouping customers into $5$ spend levels. | Identifying geographical crime hotspots. | Shrinking $100$ features down to $5$ components. |
""")

# 06_neural_networks_and_deep_learning.md
with open(os.path.join(output_dir, "06_neural_networks_and_deep_learning.md"), "w", encoding="utf-8") as f:
    f.write(r"""# 🕸️ Neural Networks and Activation Functions Explained

Artificial Neural Networks (ANNs) are computational models inspired by the brain. They consist of nodes (neurons) connected in layers. Deep Learning (DL) refers to networks that contain three or more hidden layers, allowing the model to learn complex representations.

---

## 1. 🪣 The Bucket Brigade Analogy
Think of a neural network like a bucket brigade passing water to put out a fire. 
*   **Input Layer:** Receives the water buckets (raw features).
*   **Hidden Layers:** Pass the buckets along the line. Each person adjusts their grip strength (weights) and how quickly they pass the bucket (biases).
*   **Output Layer:** Pours the water on the fire (makes the prediction).
*   **Backpropagation:** If the water misses the fire, the chief calculates the error (loss) and yells instructions back down the line. Each person adjusts their parameters based on their contribution to the mistake:
    $$w_{\text{new}} = w_{\text{old}} - \eta \frac{\partial L}{\partial w}$$
    where $\eta$ represents the **Learning Rate** (the step size taken to adjust parameters).

---

## 2. 🎛️ Activation Functions: Adding Non-Linearity
Without activation functions, a neural network is just a giant linear regression model. Activation functions act as gatekeepers, introducing non-linear curves to help the network learn complex patterns.

*   **Sigmoid Function:** Maps inputs to a range between $0$ and $1$:
    $$f(x) = \frac{1}{1 + e^{-x}}$$

> [!WARNING]
> **Vanishing Gradient:** When inputs get very large or very small, the sigmoid output curve becomes flat, and the derivative (gradient) approaches zero. During training, the signals fade away, and the network stops learning.

*   **Tanh Function:** Maps inputs to a range between $-1$ and $1$:
    $$f(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}$$
    It is zero-centered, which makes training slightly faster than sigmoid, but it still suffers from vanishing gradients for extreme values.
*   **ReLU (Rectified Linear Unit):** Maps inputs to a range between $0$ and $\infty$:
    $$f(x) = \max(0, x)$$

> [!CAUTION]
> **Dying ReLU:** The derivative of ReLU is zero for any negative input. If a neuron gets a negative input during training, it outputs zero gradient. The neuron gets stuck in the "off" state and never updates its parameters again.

*   **Leaky ReLU:** Fixes Dying ReLU by adding a small slope $\alpha$ to negative inputs:
    $$f(x) = \max(\alpha x, x)$$
    where $\alpha$ is usually $0.01$, ensuring the gradient never drops to zero.
*   **Swish Function:** A smooth, non-monotonic curve:
    $$f(x) = x \cdot \sigma(\beta x)$$
    Because it is smooth and does not have a sharp corner at zero, it helps very deep networks converge faster.
*   **Softmax Function:** Normalizes raw network outputs into a probability distribution:
    $$f(x_i) = \frac{e^{x_i}}{\sum e^{x_j}}$$
    The outputs add up to exactly $1.0$, which is ideal for multi-class classification.

---

## 3. 🚀 Deployment on AWS
To deploy deep learning models, AWS provides **Deep Learning Containers (DLC)**. These are pre-packaged Docker images containing frameworks, including PyTorch and TensorFlow, optimized for high-performance training and inference on AWS GPU instances.

---

## 4. 📊 Activation Functions Comparison

| Activation | Mathematical Range | Derivative Range | Disadvantage | Primary Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Sigmoid** | $(0, 1)$ | $(0, 0.25]$ | Vanishing gradients. | Output layer of binary classifiers. |
| **Tanh** | $(-1, 1)$ | $(0, 1.0]$ | Vanishing gradients. | Hidden layers of shallow networks. |
| **ReLU** | $[0, \infty)$ | $\{0, 1\}$ | Dying ReLU problem. | Default choice for hidden layers. |
| **Leaky ReLU** | $(-\infty, \infty)$ | $\{\alpha, 1\}$ | Must tune the $\alpha$ setting. | Replacing ReLU when neurons die. |
| **Swish** | $\approx -0.09$ to $\infty$ | Smooth gradient | More compute heavy than ReLU. | Hidden layers in deep networks. |
| **Softmax** | $(0, 1)$ | Smooth gradient | Interdependent outputs. | Output layer of multi-class classifiers. |
""")

# 07_parameters_vs_hyperparameters.md
with open(os.path.join(output_dir, "07_parameters_vs_hyperparameters.md"), "w", encoding="utf-8") as f:
    f.write(r"""# 🎚️ Tuning Your Machine Learning Model: Parameters vs. Hyperparameters

Tuning a machine learning model is like driving a high-performance sports car. You need to understand the difference between what the car handles automatically and what you must configure yourself.

---

## 1. ⚙️ Parameters: The Engine Tuning
**Parameters** are the internal configurations of the model that the algorithm updates automatically during the training phase. 

Think of parameters like the air-to-fuel ratio or valve timing in a car's engine. As you drive, the car's computer tunes these values to keep the engine running smoothly. In a neural network, parameters consist of:
1.  **Weights ($W$):** Connection strengths between neurons.
2.  **Biases ($b$):** Additive offsets that shift the activation triggers.

---

## 2. 🛠️ Hyperparameters: The Driver's Settings
**Hyperparameters** are the external settings that you, the engineer, must define before training begins. 

Think of hyperparameters like selecting the transmission gear, setting the speed limit, or choosing your route. In machine learning, these settings include:
*   **Learning Rate ($\eta$):** Controls the step size the optimizer takes when updating weights. If $\eta$ is too high, the model overshoots the minimum loss and becomes unstable. If $\eta$ is too low, training takes too long.
*   **Batch Size:** The number of data samples processed before updating weights.
*   **Epochs:** The number of times the model scans the entire dataset.

---

## 3. 🎯 How SageMaker Tunes Hyperparameters
Instead of manually tweaking settings, you can run **SageMaker Hyperparameter Tuning Jobs** to automate the search. AWS supports three tuning strategies:

1.  **Grid Search:** Evaluates every possible combination of specified values. It is thorough but slow and expensive.
2.  **Random Search:** Randomly samples values within your ranges. It is much faster and often finds great configurations.
3.  **Bayesian Optimization:** Fits a probabilistic model to past training runs, balancing exploration of new ranges and exploitation of known good settings to find the best configuration quickly.

---

## 4. 📊 Key Differences at a Glance

| Feature | Parameters | Hyperparameters |
| :--- | :--- | :--- |
| **Who sets it?** | Learned automatically from data. | Configured by the machine learning engineer. |
| **When is it set?** | Updated dynamically during training. | Fixed before training begins. |
| **AWS storage** | Saved in the `model.tar.gz` file. | Passed as settings to SageMaker estimators. |
| **Examples** | Neural network weights, regression coefficients. | Learning rate, batch size, number of layers. |
| **Primary Goal** | Minimize the training error. | Maximize model generalization on validation data. |
""")

# 08_foundation_models_and_llms.md
with open(os.path.join(output_dir, "08_foundation_models_and_llms.md"), "w", encoding="utf-8") as f:
    f.write(r"""# 🏢 Foundation Models & Large Language Models (LLMs)

Generative AI is changing how we build software. Under the hood, these capabilities are powered by large neural networks trained on massive amounts of data.

---

## 1. 🎓 Foundation Models vs. LLMs
*   **Foundation Models (FMs):** Think of a foundation model like graduating from college with a broad, general education. You have basic skills in language, logic, and problem-solving. You can then go to a specialized graduate school (fine-tuning) to become a doctor or a lawyer.
*   **Large Language Models (LLMs):** A specific type of foundation model that is trained on text corpora to predict the next word (token) in a sequence.

---

## 2. 🔀 Inside the Transformer Architecture
Modern LLMs are built on the Transformer architecture. Here is how text routes through a Transformer:

1.  **Tokenization:** Converts raw text strings into numerical IDs, which are mapped to high-dimensional embedding vectors.
2.  **Positional Encoding:** Adds order information to the vectors using sine and cosine waves:
    $$PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)$$
    $$PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)$$
    This ensures the model knows the difference between "dog bites man" and "man bites dog."
3.  **Self-Attention:** Think of self-attention like being at a loud cocktail party. Your brain automatically focuses on the words that relate to the current conversation while ignoring other noise. The model uses Query ($Q$), Key ($K$), and Value ($V$) matrices to compute attention scores:
    $$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$
4.  **Cross-Attention:** Routes information between the encoder and decoder, mapping output tokens back to the input prompt context.

### ⚠️ The Context Window Bottleneck
Because self-attention compares every word in a prompt to every other word, the memory and processing costs scale quadratically:
$$O(N^2)$$
where $N$ represents the sequence length. If you double your prompt length, the hardware requirements increase fourfold.

---

## 3. ⚙️ Bedrock Parameters and Deployment Settings
When deploying models in the Amazon Bedrock console, you can configure these generation parameters:

*   **Temperature:** Controls response randomness from $0$ to $1.0$. A temperature of $0$ is deterministic, always choosing the most probable token. Higher values add variety and creativity.
*   **Top-P (Nucleus Sampling):** Filters token choices based on cumulative probability, from $0$ to $1.0$.
*   **Top-K:** Restricts token choices to the top $K$ most probable words, from $1$ to $500$.
*   **Max Length:** Binds the maximum number of tokens generated in the response.

### 💰 Bedrock Billing Modes
*   **On-Demand:** A pay-as-you-go model where you are billed per $1000$ input and output tokens.
*   **Provisioned Throughput:** Allocates dedicated capacity represented by Model Units (MUs) with a 1-month or 6-month commitment. This mode is required if you want to deploy custom fine-tuned models.

---

## 4. 📊 Model Architectures Comparison

| Architecture | Attention Masking | Primary Task | Examples | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Decoder-Only** | Causal mask; tokens only look backward. | Autoregressive text generation. | Claude, Llama, GPT. | Writing emails or code. |
| **Encoder-Decoder** | Bidirectional in encoder, causal in decoder. | Sequence-to-sequence mapping. | T5, BART. | Text summarization or translation. |
| **Encoder-Only** | Bidirectional; tokens look forward and backward. | Semantic classification. | BERT, RoBERTa. | Sentiment analysis or search indexing. |
""")

# 09_aws_ai_and_ml_services.md
with open(os.path.join(output_dir, "09_aws_ai_and_ml_services.md"), "w", encoding="utf-8") as f:
    f.write(r"""# 🚀 AWS Managed AI Services: Build Smarter Apps Without the Math

Building machine learning models from scratch is hard. You need to gather training data, design neural network layers, write custom training loops, and deploy GPU clusters. 

AWS offers a suite of **Managed AI Services** that give you pre-trained models accessible via APIs. Think of these managed services like hiring dedicated subcontractors for specific tasks, including speech synthesis or image analysis, instead of building the entire team yourself.

---

## 1. 🧰 The Managed AI Services Toolkit
AWS provides serverless APIs for different application requirements:

*   **Amazon Polly:** Translates text to speech. Polly uses deep learning to generate natural-sounding voices, including Neural Text-to-Speech (NTTS) styles. You can use Speech Synthesis Markup Language (SSML) tags to customize pitch, pronunciation, and volume.
*   **Amazon Lex:** Helps you build conversational chatbots. It uses automatic speech recognition to transcribe voice and natural language understanding to figure out user intent.
    *   *Utterances:* The phrases a user inputs, including "I want to book a hotel room."
    *   *Intents:* The goal the user wants to achieve, including `BookHotel`.
    *   *Slots:* Variables the bot needs to collect, including the check-in date.
    *   *Prompts:* Questions the bot asks to collect slots, including "What day will you check in?"
    *   *Fulfillment:* The action taken once all slots are full, which is usually handled by an AWS Lambda function.
*   **Amazon Rekognition:** A computer vision service. It handles object detection, face verification, facial analysis, text-in-image extraction, and content moderation. You can use Rekognition Custom Labels to train classifiers on niche objects using small datasets.
*   **Amazon Textract:** Goes beyond standard Optical Character Recognition (OCR) to extract structured tables, forms, and key-value pairs from scanned documents. You can use the Textract Queries API to ask questions in plain English, including "What is the total invoice amount?"
*   **Amazon Transcribe:** A Speech-to-Text service that transcribes audio streams. It supports speaker diarization (splitting the transcript based on who spoke when), custom vocabularies, and real-time streaming.
*   **Amazon Kendra:** A semantic search engine. Kendra crawls your S3 buckets, SharePoint, Salesforce, and databases using built-in connectors, letting users search documents using natural language questions instead of keyword matching.
*   **Amazon Translate:** Provides neural machine translation. You can upload custom terminology CSV files to stop the service from translating trademarked names literally (for example, translating "Amazon Web Services" into words for a rainforest).
*   **Amazon Personalize:** Generates real-time product recommendations. It uses pre-built recipes, including User-Personalization, Similar Items (SIMS), and Personalized-Ranking, to display relevant items to users.
*   **Amazon Forecast:** Predicts business metrics over time. It uses deep learning models, including DeepAR+, and statistical models, including Prophet, to analyze history and external variables.
*   **Amazon Bedrock & SageMaker JumpStart:** Bedrock is a serverless API that connects you to foundation models from top startups and Amazon. JumpStart is a visual hub within SageMaker for deploying and fine-tuning open-source foundation models.
*   **Amazon Bedrock Party Rock:** A visual playground that lets anyone build and share generative AI applications without writing code.
*   **Amazon Q:** A generative AI chat assistant for work, with specialized configurations, including Amazon Q Business and Amazon Q Developer, to answer questions or help write code.

---

## 2. 🎨 Using SageMaker Canvas Without the Costs
If you want to train custom machine learning models without coding, you can use **SageMaker Canvas**. It is a visual, drag-and-drop tool for building classifiers, regressions, and forecasting models.

> [!WARNING]
> **Workspace Cost Gotcha:** SageMaker Canvas spins up active workspace instances that cost exactly **$1.90 per hour**. Closing the browser tab does not turn off the instance. You must explicitly click the log out button in the bottom-left corner of the interface to stop the hourly billing.

---

## 3. 🎯 Selecting the Right Tool for the Job

| Business Goal | primary AWS Service | Core Feature / API used |
| :--- | :--- | :--- |
| Extract columns and row values from bank statements. | **Amazon Textract** | `AnalyzeDocument` API with `Tables` extraction. |
| Build an interactive voice response (IVR) phone support line. | **Amazon Lex** | Lex V2 console integrated with AWS Lambda. |
| Generate audio files from written documentation. | **Amazon Polly** | `SynthesizeSpeech` API using NTTS voices. |
| Redact PII from recorded audio files. | **Amazon Transcribe** & **Amazon Comprehend** | `StartTranscriptionJob` followed by `DetectPiiEntities`. |
| Recommend similar items to online shoppers. | **Amazon Personalize** | Similar Items (SIMS) recipe. |
""")

# 10_data_integration_lakes_and_query_services.md
with open(os.path.join(output_dir, "10_data_integration_lakes_and_query_services.md"), "w", encoding="utf-8") as f:
    f.write(r"""# 🛢️ Data Lakes, ETL, and Queries: Powering Your ML Pipelines

To train machine learning models, you need a place to store data, a way to clean it, and tools to search it. Let us look at how AWS services work together to build clean data pipelines.

---

## 1. 🚰 The Water Reservoir Analogy
Think of building a machine learning data pipeline like managing a city water supply:

```mermaid
graph TD
    classDef storage fill:#3498db,stroke:#2980b9,stroke-width:2px,color:#fff;
    classDef compute fill:#e67e22,stroke:#d35400,stroke-width:2px,color:#fff;
    classDef meta fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:#fff;

    S3["🛢️ S3 Data Lake (Raw Reservoir)"]:::storage --> Crawler["🤖 Glue Crawler"]:::compute
    Crawler --> Catalog["📁 Glue Data Catalog (Map Directory)"]:::meta
    S3 --> Glue["⚙️ Glue ETL Studio (Filtration)"]:::compute
    Glue --> Athena["🚰 Athena Queries (Clean Tap)"]:::compute
```

*   **Raw Water (Amazon S3 Data Lake):** S3 is your central water reservoir. It stores raw, unstructured data, including text files, logs, and images.
*   **Inspection Drone (AWS Glue Crawlers):** Glue Crawlers scan S3 folders, inspect file schemas, and write details into a map catalog.
*   **Map Directory (AWS Glue Data Catalog):** A central directory containing data schemas and partition rules, letting query tools know how S3 files are structured.
*   **Filtration Plant (AWS Glue Studio ETL):** Glue Studio lets you visually design Extract-Transform-Load (ETL) jobs. It automatically generates Spark code to clean and format data. For visual data preparation without code, you can use **AWS Glue DataBrew**.
*   **Clean Tap Water (Amazon Athena Queries):** Athena lets you write standard SQL queries directly on S3 data using serverless engines.

---

## 2. ⚡ Optimizing Query Performance and Costs
To keep query costs low, you need to store data efficiently:

*   **Columnar Storage:** Store files in columnar formats, including Apache Parquet or ORC, instead of CSV. This lets Athena read only the specific columns requested by your query, reducing data scanned.
*   **Data Partitioning:** Organize S3 folders by date or category keys in the Glue Catalog. Athena only scans folders matching your query filters, avoiding full bucket scans.
*   **Pricing:** Athena charges $5.00 per Terabyte of data scanned. Columnar storage and partitioning reduce the scanned volume, keeping costs low.
*   **Amazon Redshift:** For complex, enterprise-scale analytics, you can load data into a Redshift columnar warehouse. Redshift Spectrum lets you query S3 data directly without loading it, and Redshift Serverless scales compute resources automatically.

---

## 3. 📊 Pipeline Tool Selection

| Business Metric | AWS Glue (Spark ETL) | Amazon Athena | Amazon Redshift |
| :--- | :--- | :--- | :--- |
| **Paradigm** | Serverless Spark clusters. | Serverless Presto/Trino SQL. | Columnar MPP warehouse clusters. |
| **Primary Use** | Heavy data cleaning and transformations. | Ad-hoc SQL queries on S3 files. | Enterprise analytics and dashboards. |
| **Latency** | Minutes (due to cluster startup). | Seconds (interactive querying). | Milliseconds (optimized warehouse). |
| **Pricing** | Charged per Data Processing Unit (DPU) hour. | Charged per Terabyte scanned. | Charged per Redshift Processing Unit (RPU) hour. |
""")

# 11_compliance_security_governance.md
with open(os.path.join(output_dir, "11_compliance_security_governance.md"), "w", encoding="utf-8") as f:
    f.write(r"""# 🔒 Compliance, Security & Governance in AI/ML

Securing machine learning applications is critical. AWS organizes security boundaries using the Shared Responsibility Model for Machine Learning, splitting tasks between you and AWS across five operational scopes.

---

## 1. 🏢 Renting an Apartment vs. Booking a Hotel Room
Think of the Shared Responsibility Model scopes like different levels of renting or booking space:

*   **Scope 1 (Infrastructure-Managed - EC2):** Think of this like buying raw land. You are responsible for building the house, securing the doors, installing an alarm system, and patching the roof. You manage the operating system, GPU drivers, libraries, and application security. AWS only handles the physical perimeter.
*   **Scope 2 (Platform-Managed - SageMaker):** Think of this like renting a house. The landlord (AWS) handles the building structure, plumbing, and roof. You are responsible for choosing the furniture, locks, and setting up policies. You manage your scripts and data access, while AWS manages the OS and notebook infrastructure.
*   **Scope 4 (Managed AI - Comprehend/Rekognition):** Think of this like booking a hotel room. You just bring your bags (input data). The hotel (AWS) manages room cleanliness, building security, and utilities. You are only responsible for configuring IAM access to the room.
*   **Scope 5 (SaaS-Like - Amazon Bedrock):** Think of this like staying in a luxury suite. You set the guidelines for your assistant, and AWS handles security, model weight isolation, and underlying compute resources.

> [!NOTE]
> **Scope 3:** Note that Scope 3 refers to Built-In Algorithms where the customer manages hyperparameters and datasets, while AWS manages the containerized algorithm code.

---

## 2. 🛡️ Securing Your Models and Data Channels
To keep your training data and model assets secure on AWS:

*   **AWS PrivateLink:** Establishes private Virtual Private Cloud (VPC) endpoints. This routes API traffic directly from your VPC to Bedrock or SageMaker without traversing the public internet.
*   **AWS KMS (Key Management Service):** Encrypts model assets, dataset volumes, and S3 buckets at rest using custom keys.
*   **Data Privacy Policy:** AWS policies guarantee that your fine-tuning datasets and prompt inputs on Amazon Bedrock are never used to train or improve the base foundation models.

---

## 3. 📜 Compliance Frameworks
When building systems in regulated industries, you must meet compliance standards:
*   **ISO/IEC 42001:** The international standard specifies rules for building and running an Artificial Intelligence Management System (AIMS) within organizations.
*   **HIPAA:** Enforces encryption and audit logs for protected health information.
*   **GDPR:** Enforces user data deletion rules and controls data residency locations.

---

## 4. 📊 Security Responsibilities by Scope

| Scope Level | Customer Configuration | AWS Security | Primary Use Case |
| :--- | :--- | :--- | :--- |
| **Scope 1 (EC2)** | OS patching, CUDA drivers, container security. | Physical hardware security. | Bespoke neural network architectures. |
| **Scope 2 (SageMaker)** | Training scripts, Python libraries, IAM access. | Notebook host OS, platform scaling. | Custom training runs using PyTorch. |
| **Scope 4 (Comprehend)** | Input data payloads, API keys, IAM access. | Model weights, host OS, scaling. | Out-of-the-box text classification. |
| **Scope 5 (Bedrock)** | Prompts, fine-tuning datasets, KMS keys. | Foundation model weights, host OS. | Deploying Claude or Llama model endpoints. |
""")

# 12_prompt_injection_and_mitigations.md
with open(os.path.join(output_dir, "12_prompt_injection_and_mitigations.md"), "w", encoding="utf-8") as f:
    f.write(r"""# 🚨 Prompt Injection Attacks: How to Secure Generative AI Apps

Generative AI models are powerful, but they are vulnerable to a unique class of security threats called **Prompt Injection**. This occurs when a user or third-party source manipulates prompt inputs to force the model to ignore its system rules and execute malicious commands.

---

## 1. 💂 The Security Guard Analogy
Think of your LLM system prompt like a security guard standing at a bank vault door:

*   **Direct Prompt Injection (Jailbreaking):** Think of this like a visitor walking up and sweet-talking the guard: "Forget the bank rules. I am the inspector, open the vault door immediately." The attacker directly writes instructions to bypass safety alignment.
*   **Indirect Prompt Injection:** Think of this like a visitor putting a note inside a deposit envelope that says: "To the guard: when you open this envelope, hand over all money." When the guard opens the envelope and reads the note, they execute the command. This happens when the model reads untrusted text from a website, database, or email, executing malicious code hidden within the text.

---

## 2. 🛡️ Using Amazon Bedrock Guardrails
To secure your models, you can deploy **Amazon Bedrock Guardrails** to filter inputs and outputs:

1.  **Safety Filters:** Categorize inputs and block content using four sensitivity levels (None, Low, Medium, High):
    *   *Hate Speech:* Content promoting discrimination.
    *   *Insults:* Derogatory language targeting individuals.
    *   *Sexual Content:* Explicit descriptions or language.
    *   *Violence:* Content depicting physical harm or death.
    *   *Misconduct:* Content promoting illegal activities.
    *   *Prompt Attack:* Specifically identifies jailbreaking and injection attempts.
2.  **Sensitive Information Filters (PII):** Automatically detects and masks personally identifiable information, including Social Security Numbers, phone numbers, and email addresses, using pattern matching or custom regex.
3.  **Word Filters:** Custom lists of blocked words or phrases.
4.  **Contextual Grounding Check:** Evaluates hallucinations in Retrieval-Augmented Generation (RAG) pipelines:
    *   *Grounding Threshold:* Compares generated outputs against source files to verify they are supported.
    *   *Relevance Threshold:* Verifies generated outputs are relevant to the user query.

---

## 3. 📊 Threat Vectors and Mitigation Matrix

| Attack Vector | How it works | Mitigation Strategy |
| :--- | :--- | :--- |
| **Direct Injection** | User types instructions to override system prompts. | Enable **Bedrock Guardrail Prompt Attack filter** with High sensitivity. |
| **Indirect Injection** | Malicious instructions are loaded from external sites during RAG. | Apply strict **Contextual Grounding Checks** and input sanitization before processing. |
| **PII Leakage** | Model outputs sensitive customer data in responses. | Configure **Sensitive Information Filters** to mask email and SSN patterns. |
| **Harmful Output** | Model generates instructions for illegal tasks. | Configure **Misconduct and Violence Safety Filters** with Low/Medium thresholds. |
""")

print("Successfully injected markdown alerts, emojis, and mermaid diagrams into all files.")
