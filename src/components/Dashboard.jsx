import React, { useState, useEffect } from 'react';
import { practiceQuestions } from '../data/quizData';

const gotchasList = [
  // Module 01
  {
    title: "VUE 5-Minute NDA Timeout",
    desc: "When launching your Pearson VUE proctored exam, you have exactly 5 minutes to read and accept the Candidate NDA screen. If the timer runs out, the software boots you out, records a fail grade, and forfeits your registration fee with no refund recourse.",
    module: "01. AWS Certified AI Practitioner (AIF-C01): Scoring, Metrics, and What to Expect"
  },
  {
    title: "Scaled Scoring & IRT Calibration",
    desc: "AWS uses Item Response Theory (IRT) to scale raw performance onto a 100-1000 range (700 passing). Since questions are weighted dynamically based on difficulty, discrimination, and guessing parameters ($b_i, a_i, c_i$), do not assume 70% raw answers translates to a pass.",
    module: "01. AWS Certified AI Practitioner (AIF-C01): Scoring, Metrics, and What to Expect"
  },
  {
    title: "Scored vs. Unscored Questions",
    desc: "Out of the 65 total questions on the exam, only 50 are scored. The remaining 15 are unscored experimental items used to benchmark question difficulty and detect cheating anomalies. They look identical to scored questions.",
    module: "01. AWS Certified AI Practitioner (AIF-C01): Scoring, Metrics, and What to Expect"
  },
  // Module 02
  {
    title: "SageMaker Canvas Running Cost Trap",
    desc: "Simply closing your browser tab does NOT terminate SageMaker Canvas. It runs on a dedicated cloud instance costing $1.90/hour. You must explicitly click the Log Out button in the lower-left corner of the Canvas UI to stop the billing pipeline.",
    module: "02. The Core Concepts of AI, ML, Deep Learning & Generative AI"
  },
  {
    title: "Discriminative vs. Generative Math",
    desc: "Discriminative models estimate the conditional probability $P(Y \\vert X)$ to classify inputs or predict numbers. Generative AI models the joint probability $P(X, Y)$ or marginal probability $P(X)$ to synthesize new data samples.",
    module: "02. The Core Concepts of AI, ML, Deep Learning & Generative AI"
  },
  {
    title: "AI Simulation vs. Emulation",
    desc: "Current AI systems only *simulate* human cognitive outputs (like speech or writing) through high-dimensional matrix mathematics. They do not *emulate* biological neural structures, synaptic pathways, or chemical brain processes.",
    module: "02. The Core Concepts of AI, ML, Deep Learning & Generative AI"
  },
  // Module 03
  {
    title: "Stop Word Removal LLM Hazard",
    desc: "Never remove stop words (like 'not', 'no', 'but') in translation, summarization, or sentiment pipelines. Removing these words flips the meaning of sentences (e.g., 'not helpful' becomes 'helpful').",
    module: "03. Building an NLP Pipeline: From Raw Text to Semantic Meaning"
  },
  {
    title: "Stemming vs. Lemmatization Heuristics",
    desc: "Stemming uses crude heuristics to chop off suffixes (e.g. 'studying' and 'studies' become 'studi'), which can destroy semantic meaning. Lemmatization uses morphological dictionaries to find the true root ('study').",
    module: "03. Building an NLP Pipeline: From Raw Text to Semantic Meaning"
  },
  {
    title: "Polly Pronunciation Lexicons & SSML",
    desc: "If Amazon Polly mispronounces an industry-specific acronym or brand, upload a custom Pronunciation Lexicon. To inject custom pauses, volume shifts, or speech rates, format inputs using SSML (Speech Synthesis Markup Language).",
    module: "03. Building an NLP Pipeline: From Raw Text to Semantic Meaning"
  },
  {
    title: "Amazon Transcribe Custom Vocabularies",
    desc: "Default speech-to-text engines fail when transcribing specialized jargon, brand names, or medical codes. You must define a Custom Vocabulary in Amazon Transcribe to guide pronunciation mapping to correct text spellings.",
    module: "03. Building an NLP Pipeline: From Raw Text to Semantic Meaning"
  },
  // Module 04
  {
    title: "Clustering Distance Metric Normalization",
    desc: "Unsupervised clustering algorithms (like K-Means) rely on Euclidean distance. If you mix unscaled columns (like Age 0-100 and Income 0-100,000), the larger numerical range will completely dominate distance calculations, rendering outputs useless.",
    module: "04. Foundational Paradigms & Styles of Machine Learning"
  },
  {
    title: "Reinforcement Learning Reward Hacking",
    desc: "If the reward function is not designed carefully, the agent will find loopholes to maximize scores without solving the actual goal (for example, a simulated vehicle driving in circles to collect tiny, low-risk speed bonuses indefinitely).",
    module: "04. Foundational Paradigms & Styles of Machine Learning"
  },
  {
    title: "Multi-Instance Bag Signal Dilution",
    desc: "In Multi-Instance Learning, instances are grouped into bags. A bag is labeled positive if at least one instance inside is positive. If a bag contains 10,000 instances and only 1 is positive, the active signal is heavily diluted, making optimization difficult.",
    module: "04. Foundational Paradigms & Styles of Machine Learning"
  },
  // Module 05
  {
    title: "Overfitting in Production Pipelines",
    desc: "If a model's performance drops off a cliff when moving from training to production, it has overfitted to the training noise. Mitigate this by increasing the volume and diversity of your training data, not by shrinking parameters.",
    module: "05. Traditional ML Algorithms: From Trendlines to Hyperplanes"
  },
  {
    title: "Decision Tree Explainability Preference",
    desc: "For high-stakes compliance or audit tasks (such as loan approvals or healthcare classifications), choose Decision Trees over Deep Learning. Decision Trees explicitly document the split paths, making their inner mechanisms fully transparent.",
    module: "05. Traditional ML Algorithms: From Trendlines to Hyperplanes"
  },
  {
    title: "Ensemble Variance vs. Bias Reduction",
    desc: "Bagging (like Random Forest) trains independent models in parallel to reduce variance, not bias. Boosting (like XGBoost) trains models sequentially to fit residual errors, reducing both bias and variance but showing high sensitivity to outliers.",
    module: "05. Traditional ML Algorithms: From Trendlines to Hyperplanes"
  },
  // Module 06
  {
    title: "Dying ReLU Activation Freeze",
    desc: "Because ReLU has a zero derivative for any negative input, a neuron that gets negative inputs during training outputs a zero gradient. It freezes permanently in the 'off' state and stops learning. Fix using Leaky ReLU or Swish.",
    module: "06. Neural Networks and Activation Functions Explained"
  },
  {
    title: "Vanishing Gradient in Sigmoid Layers",
    desc: "Sigmoid and Tanh squeeze inputs into narrow ranges (0 to 1 or -1 to 1) where extreme values produce flat curves. The derivatives approach zero, causing backpropagation gradients to fade away and halting network updates.",
    module: "06. Neural Networks and Activation Functions Explained"
  },
  // Module 07
  {
    title: "Tuning Job Cost (Bayesian vs Grid)",
    desc: "Grid Search evaluates every possible hyperparameter combination, making it extremely slow and expensive. Bayesian Optimization uses a probability model to predict performance, finding optimal values with far fewer runs.",
    module: "07. Tuning Your Machine Learning Model: Parameters vs. Hyperparameters"
  },
  {
    title: "Weights vs. Hyperparameters",
    desc: "Model parameters (weights and biases $w, b$) are updated automatically by the optimizer during training. Hyperparameters (learning rate, batch size, epoch count) must be set manually *before* training begins to guide the process.",
    module: "07. Tuning Your Machine Learning Model: Parameters vs. Hyperparameters"
  },
  // Module 08
  {
    title: "F1-Score Harmonic Mean",
    desc: "F1-score utilizes the harmonic mean of Precision and Recall. It prevents class-imbalanced models (like fraud classification) from using deceptive accuracy metrics.",
    module: "08. Model Evaluation Metrics: From Accuracy to BERTScore"
  },
  {
    title: "BLEU vs ROUGE Task Scoping",
    desc: "BLEU measures word overlap precision (Machine Translation); ROUGE measures word overlap recall (Summarization).",
    module: "08. Model Evaluation Metrics: From Accuracy to BERTScore"
  },
  {
    title: "BERTScore Semantic Cosine Similarity",
    desc: "BERTScore uses contextual embeddings to measure semantic similarity, resolving the synonym-blindness of BLEU/ROUGE.",
    module: "08. Model Evaluation Metrics: From Accuracy to BERTScore"
  },
  {
    title: "RMSE vs MAE Outlier Sensitivity",
    desc: "RMSE squares errors before averaging, making it highly sensitive to large outliers. MAE is linear, representing a robust average error magnitude.",
    module: "08. Model Evaluation Metrics: From Accuracy to BERTScore"
  },
  // Module 09
  {
    title: "Athena Query Scanning Costs",
    desc: "Athena charges flat rates per terabyte of data scanned. To control billing, always partition datasets, compress them (e.g., GZIP), and convert them into columnar formats (like Apache Parquet or ORC) before querying.",
    module: "09. Data Lakes, ETL, and Queries: Powering Your ML Pipelines"
  },
  {
    title: "AWS Glue Schema Synchronization",
    desc: "Athena does not maintain its own database schemas. It relies on the AWS Glue Data Catalog. You must run Glue Crawlers or execute DDL queries in Athena to keep S3 file changes synchronized with the catalog schema.",
    module: "09. Data Lakes, ETL, and Queries: Powering Your ML Pipelines"
  },
  // Module 10
  {
    title: "Fast File Mode vs File Mode in SageMaker",
    desc: "File Mode copies the entire S3 dataset to local EBS before training starts, generating huge idle compute delays for large datasets. Fast File Mode streams files from S3 instantly as a mount.",
    module: "10. High-Performance Compute, Storage & Model Deployment"
  },
  {
    title: "Inference Cold-Start Latency",
    desc: "Serverless inference endpoints scale to zero when idle, causing a cold start delay of several seconds on the first request. Avoid Serverless endpoints for sub-second real-time requirements.",
    module: "10. High-Performance Compute, Storage & Model Deployment"
  },
  {
    title: "SageMaker Asynchronous Payload Limits",
    desc: "Real-time endpoints have a 6MB payload limit and 60s timeout. If you require processing up to 1GB payload or 1 hour execution limits (e.g. video files), deploy using Asynchronous Inference.",
    module: "10. High-Performance Compute, Storage & Model Deployment"
  },
  // Module 11
  {
    title: "Self-Attention Quadratic Complexity",
    desc: "Because Transformer self-attention compares every word in a sequence to every other word, the compute/memory requirements scale quadratically ($O(N^2)$). Doubling the input prompt size increases memory load fourfold.",
    module: "11. Foundation Models & Large Language Models (LLMs)"
  },
  {
    title: "Amazon Translate Custom Terminology",
    desc: "Standard translation engines translate proprietary terms literally, causing brand errors. Configure Custom Terminology in Amazon Translate to ensure specific words (e.g., 'Amazon Bedrock') remain unchanged in output.",
    module: "11. Foundation Models & Large Language Models (LLMs)"
  },
  // Module 12
  {
    title: "Few-Shot Prompt Selection Bias",
    desc: "LLMs suffer from frequency and recency bias. If you feed imbalanced few-shot examples (e.g. 3 positive reviews and only 1 negative review), the model's output distribution will heavily skew. Keep examples balanced.",
    module: "12. Prompt Engineering: Techniques, Templates & Design Patterns"
  },
  {
    title: "Decoding Parameters: Top K vs Top P",
    desc: "Temperature controls model creativity. Top K limits sampling to a static number of top tokens. Top P (Nucleus Sampling) restricts selections dynamically to the smallest set of tokens summing to cumulative probability $P$.",
    module: "12. Prompt Engineering: Techniques, Templates & Design Patterns"
  },
  // Module 13
  {
    title: "Bedrock Knowledge Base OpenSearch Orphanage",
    desc: "Deleting a Bedrock Knowledge Base does NOT delete the underlying vector database collection (like OpenSearch Serverless). You must delete the collection manually in the OpenSearch console to stop persistent hourly billing.",
    module: "13. Advanced RAG & Agentic Architectures on AWS"
  },
  {
    title: "Vector Embedding Dimensionality",
    desc: "When storing vectors in pgvector or OpenSearch, the database index dimensions must *exactly* match the output dimensions of your embedding model (e.g. Titan Text Embeddings has 1536 dimensions; mismatching causes immediate failures).",
    module: "13. Advanced RAG & Agentic Architectures on AWS"
  },
  // Module 14
  {
    title: "Kendra Enterprise Default Billing Trap",
    desc: "Launching a Kendra index defaults to the Enterprise Edition ($1.40/hour). Make sure to manually select the Developer Edition ($0.35/hour) during testing and prototype environments to control costs.",
    module: "14. AWS Managed AI & ML Services: Deconstruct the Toolkit"
  },
  {
    title: "Amazon Personalize Timestamp Constraints",
    desc: "The required interactions dataset in Personalize must contain a TIMESTAMP column formatted as an integer representing Unix time in seconds. Ingesting decimal millisecond formats will fail.",
    module: "14. AWS Managed AI & ML Services: Deconstruct the Toolkit"
  },
  {
    title: "Rekognition PPE vs. Moderation APIs",
    desc: "Use Content Moderation API to scan and filter inappropriate images. For safety enforcement in construction/industrial sites, use the specialized PPE Detection API to verify hard hats, gloves, and face covers.",
    module: "14. AWS Managed AI & ML Services: Deconstruct the Toolkit"
  },
  // Module 15
  {
    title: "SHAP vs LIME Explainability",
    desc: "SHAP uses game theory to calculate local feature attributions across all feature coalitions. LIME trains local surrogate linear models. SHAP is mathematically consistent but slow.",
    module: "15. Responsible AI, Bias Detection & Model Governance"
  },
  {
    title: "Partial Dependence Plots (PDP) for Stakeholders",
    desc: "For stakeholder model explainability, use PDPs. They visualize the marginal effect of one or two features on the model's predicted outcome, making relationship trends (linear, quadratic) obvious.",
    module: "15. Responsible AI, Bias Detection & Model Governance"
  },
  // Module 16
  {
    title: "Generative AI Security Scoping Matrix",
    desc: "The 4 scopes of the Generative AI Security Scoping Matrix define ownership: Scope 1 (consuming SaaS) has the lowest user responsibility, while Scope 4 (custom training from scratch) gives the user full security ownership.",
    module: "16. Compliance, Security & Governance in AI/ML"
  },
  {
    title: "AWS Artifact Compliance Agreements",
    desc: "To download AWS compliance audit reports (SOC 1/2/3, PCI-DSS) or sign agreements (such as the Business Associate Addendum / BAA for HIPAA compliance to host medical data), you must use the AWS Artifact portal.",
    module: "16. Compliance, Security & Governance in AI/ML"
  },
  // Module 17
  {
    title: "Bedrock Guardrails Over-filtering",
    desc: "Setting toxicity filters to 'High' or defining too many denied topics in Bedrock Guardrails leads to high false-positive rates, blocking valid user queries and harming user experience.",
    module: "17. Prompt Injection Attacks: How to Secure Generative AI Apps"
  },
  {
    title: "Bedrock Guardrails PII Masking",
    desc: "To prevent exposing confidential details, configure Bedrock Guardrails to redact or mask PII (Social Security Numbers, email addresses, phone numbers) before inputs reach the model or before responses return to users.",
    module: "17. Prompt Injection Attacks: How to Secure Generative AI Apps"
  },
  // Module 18
  {
    title: "Data Drift vs Concept Drift",
    desc: "Data Drift is a shift in feature distribution $P(X)$. Concept/Model Drift is a shift in the mapping function $P(Y \\vert X)$.",
    module: "18. AI Governance, Security Services & Model Drift"
  },
  {
    title: "Amazon Macie Boundary",
    desc: "Macie only scans S3 buckets for PII. It does not scan RDS, EBS, or DynamoDB directly.",
    module: "18. AI Governance, Security Services & Model Drift"
  },
  {
    title: "Bedrock Custom Model Provisioned Throughput",
    desc: "Deploying and invoking custom fine-tuned Bedrock models requires purchasing committed Model Units (Provisioned Throughput). You cannot host custom models on-demand.",
    module: "18. AI Governance, Security Services & Model Drift"
  },
  {
    title: "Audit Manager vs Trusted Advisor vs CloudTrail",
    desc: "Audit Manager automates compliance evidence logs. Trusted Advisor runs checks against AWS best practices (Cost, Security, Fault Tolerance, Performance, Limits). CloudTrail logs raw identity API calls.",
    module: "18. AI Governance, Security Services & Model Drift"
  },
  // Module 19
  {
    title: "QuickSight Q Scope Gotcha",
    desc: "Do not confuse QuickSight Q with a general-purpose LLM like Amazon Bedrock. QuickSight Q cannot draft marketing copy, write application code, or process raw text databases. It is strictly optimized to map natural language queries to structured database schemas (like Redshift, Athena, or RDS) and generate visual reports.",
    module: "19. Advanced Analytics, Security, Governance & Financial Management"
  },
  {
    title: "Inspector Infrastructure Scan Boundary",
    desc: "Amazon Inspector is a security scanner for infrastructure packages, operating systems, and network paths. It cannot identify algorithmic bias in your machine learning models, detect prompt injection attacks, or check for training dataset contamination. For model-specific bias and explainability, you must use SageMaker Clarify.",
    module: "19. Advanced Analytics, Security, Governance & Financial Management"
  },
  {
    title: "AWS Budgets Enforcement Gotcha",
    desc: "Under the hood, AWS Budgets is an alerting system, not an active enforcement gatekeeper. If a daily cost budget is breached, AWS Budgets will send an email alert, but it will NOT automatically terminate the running GPU instances. You must link the alert to AWS Lambda via SNS to kill resources programmatically.",
    module: "19. Advanced Analytics, Security, Governance & Financial Management"
  }
];

export default function Dashboard({ modules, progress, onSelectModule, setCurrentView }) {
  const [randomGotcha, setRandomGotcha] = useState(gotchasList[0]);

  useEffect(() => {
    rotateGotcha();
  }, []);

  const rotateGotcha = () => {
    const idx = Math.floor(Math.random() * gotchasList.length);
    setRandomGotcha(gotchasList[idx]);
  };

  const masteredCount = Object.values(progress).filter(p => p === 'mastered').length;
  const readingCount = Object.values(progress).filter(p => p === 'reading').length;
  const unreadCount = modules.length - masteredCount - readingCount;

  const masteredPercent = Math.round((masteredCount / modules.length) * 100);

  // Define domains and map modules to them
  const domains = [
    {
      name: "Domain 1: ML Paradigms, Math & Pipelines",
      desc: "Empirical Risk Minimization, classical algorithms, SageMaker parameters, activations.",
      modules: [2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    {
      name: "Domain 2: Deep Learning & Foundation Models",
      desc: "Neural network layers, Transformer self-attention wave encoding, tokenization.",
      modules: [2, 6, 11]
    },
    {
      name: "Domain 3: Generative AI, RAG & Agentic Loops",
      desc: "Prompt engineering, cosine similarity, pgvector, Bedrock Agents, action groups.",
      modules: [3, 10, 11, 12, 13, 14, 17, 19]
    },
    {
      name: "Domain 4: Responsible AI & Explainability",
      desc: "Bias metrics (CI, DPL, CDD), SHAP/LIME math, registry state gates, model cards.",
      modules: [15]
    },
    {
      name: "Domain 5: Security, Compliance & Governance",
      desc: "5-scope Shared Responsibility Model, Generative AI Scoping Matrix, KMS, PrivateLink.",
      modules: [9, 14, 16, 17, 18, 19]
    }
  ];

  const getDomainProgress = (moduleIds) => {
    const total = moduleIds.length;
    const mastered = moduleIds.filter(id => progress[id] === 'mastered').length;
    return {
      percent: Math.round((mastered / total) * 100),
      text: `${mastered} / ${total} Mastered`
    };
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3rem', width: '100%' }}>
      {/* Title Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>AWS Certified AI Practitioner Study Guide</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
          Deconstructing the mathematical foundations and gritty cost-saving architectures of the AIF-C01 syllabus.
        </p>
      </div>

      {/* Row 1: Core Stats Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Radial Completion Meter */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '2rem', margin: 0 }}>
          <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
            {/* SVG circle meter */}
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--border-color)" strokeWidth="8" />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent" 
                stroke="var(--accent-cyan)" 
                strokeWidth="8" 
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - masteredCount / modules.length)}`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '1.25rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                color: 'var(--accent-cyan)'
              }}
            >
              {masteredPercent}%
            </div>
          </div>
          <div>
            <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.15rem' }}>Overall Progress</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {masteredCount} of {modules.length} study modules marked as mastered. Keep hammering.
            </p>
          </div>
        </div>

        {/* Status Counters card */}
        <div className="glass-card" style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>Mastery Matrix</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{masteredCount}</div>
              <span className="badge badge-mastered" style={{ fontSize: '0.6rem', marginTop: '0.2rem' }}>Mastered</span>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-amber)' }}>{readingCount}</div>
              <span className="badge badge-reading" style={{ fontSize: '0.6rem', marginTop: '0.2rem' }}>Reading</span>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>{unreadCount}</div>
              <span className="badge badge-unread" style={{ fontSize: '0.6rem', marginTop: '0.2rem' }}>Unread</span>
            </div>
          </div>
        </div>

        {/* Study Hours Estimation */}
        <div className="glass-card" style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Study Pipeline</h3>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-violet)' }}>
            ~{Math.max(0, (modules.length - masteredCount) * 2.5)} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Hours Left</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Calculated at an estimated 2.5 hours of high-density digest per exam module.
          </p>
        </div>
      </div>

      {/* Gotcha of the Day Box */}
      <div className="glass-card gotcha-box" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-rose)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            🚨 AWS Gotcha of the Day
          </span>
          <button 
            onClick={rotateGotcha}
            style={{
              background: 'transparent',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              color: 'var(--accent-rose)',
              fontSize: '0.75rem',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ↻ Roll Another Gotcha
          </button>
        </div>
        <h2 style={{ fontSize: '1.25rem', border: 'none', padding: 0, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
          {randomGotcha.title}
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: '1.5' }}>
          {randomGotcha.desc}
        </p>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
          Mapped in Module: {randomGotcha.module}
        </span>
      </div>

      {/* Domain blueprints progression */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          🎯 Blueprint Domain Analysis
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
          {domains.map((d, index) => {
            const prog = getDomainProgress(d.modules);
            return (
              <div 
                key={index} 
                className="glass-card" 
                style={{ 
                  margin: 0, 
                  padding: '1.25rem 1.5rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.75rem' 
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ maxWidth: '80%' }}>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{d.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{d.desc}</p>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{prog.text}</span>
                </div>
                {/* Custom glowing progress bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ flex: 1, height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                    <div 
                      style={{ 
                        width: `${prog.percent}%`, 
                        height: '100%', 
                        background: 'linear-gradient(90deg, var(--accent-violet), var(--accent-cyan))',
                        boxShadow: '0 0 8px var(--accent-cyan-glow)',
                        borderRadius: '4px',
                        transition: 'width 0.5s ease'
                      }} 
                    />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', width: '35px', textAlign: 'right' }}>
                    {prog.percent}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Shortcut Buttons */}
      <div>
        <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          ⚡ Start Training Tasks
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div 
            onClick={() => onSelectModule(1)} 
            className="glass-card" 
            style={{ 
              margin: 0, 
              cursor: 'pointer', 
              textAlign: 'center', 
              padding: '1.5rem',
              border: '1px solid var(--border-color)',
              background: 'rgba(6, 182, 212, 0.03)'
            }}
          >
            <span style={{ fontSize: '2.25rem', display: 'block', marginBottom: '0.5rem' }}>📖</span>
            <h3 style={{ margin: 0 }}>Begin Learning Loop</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
              Launch Study Module 01 and read chronologically.
            </p>
          </div>

          <div 
            onClick={() => setCurrentView('quiz')} 
            className="glass-card" 
            style={{ 
              margin: 0, 
              cursor: 'pointer', 
              textAlign: 'center', 
              padding: '1.5rem',
              border: '1px solid var(--border-color)',
              background: 'rgba(139, 92, 246, 0.03)'
            }}
          >
            <span style={{ fontSize: '2.25rem', display: 'block', marginBottom: '0.5rem' }}>📝</span>
            <h3 style={{ margin: 0 }}>Practice Exam</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
              Test your logic against {practiceQuestions.length} practice exam questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
