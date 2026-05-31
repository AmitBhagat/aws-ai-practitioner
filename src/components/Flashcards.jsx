import React, { useState } from 'react';
import KaTexMath from './KaTexMath';

const flashcardsList = [
  {
    id: 1,
    title: "Item Response Theory (3PL Formula)",
    category: "General Mechanics",
    front: "$$P_i(\\theta) = c_i + \\frac{1 - c_i}{1 + e^{-a_i(\\theta - b_i)}}$$",
    back: "Psychometric scoring model. Theta is latent ability. b_i is difficulty (point of 50% success probability). a_i is discrimination. c_i is the guessing parameter. AWS scales raw scores into 100 to 1000 standard outputs."
  },
  {
    id: 2,
    title: "Weights vs. Biases",
    category: "Domain 1: ML Parameters",
    front: "Weights ($W$) vs. Biases ($b$)",
    back: "Weights determine connection strengths between nodes and input feature importance. Biases are additive offsets independent of features that shift the activation threshold of nodes."
  },
  {
    id: 3,
    title: "Empirical Risk Minimization (ERM)",
    category: "Domain 1: Foundations",
    front: "$$\\min_{w} \\frac{1}{N} \\sum_{i=1}^N L(f(x_i; w), y_i)$$",
    back: "The mathematical backbone of machine learning. The algorithm optimizes weights (w) to minimize the average loss (L) across N samples in the static training dataset."
  },
  {
    id: 4,
    title: "Learning Rate ($\\eta$)",
    category: "Domain 1: HPO",
    front: "$$w_{\\text{new}} = w_{\\text{old}} - \\eta \\frac{\\partial L}{\\partial w}$$",
    back: "Step size the optimizer takes. If eta is too high, it overshoots the minimum loss and oscillates. If too low, training takes too long. Managed by SageMaker HPO pipeline variables SM_HPS."
  },
  {
    id: 5,
    title: "Cosine Similarity",
    category: "Domain 3: Vector Search",
    front: "$$\\text{Cosine Similarity}(\\vec{q}, \\vec{d}) = \\frac{\\vec{q} \\cdot \\vec{d}}{\\|\\vec{q}\\| \\|\\vec{d}\\|}$$",
    back: "Measures vector alignment based on angle, completely ignoring magnitude. Best for document and semantic search because document length variations do not bias the score."
  },
  {
    id: 6,
    title: "Self-Attention Scores",
    category: "Domain 2: Transformers",
    front: "$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$",
    back: "Core Transformer engine. Uses Query, Key, and Value matrices. Compares every token against every other token to find relationships, creating quadratic complexity O(N²)."
  },
  {
    id: 7,
    title: "Softmax Function",
    category: "Domain 1 & 2: Activations",
    front: "$$f(x_i) = \\frac{e^{x_i}}{\\sum e^{x_j}}$$",
    back: "Normalizes raw outputs into a probability distribution. All output nodes represent positive values between 0 and 1, adding up to exactly 1.0. Standard for multi-class classification."
  },
  {
    id: 8,
    title: "Sigmoid Activation",
    category: "Domain 1 & 2: Activations",
    front: "$$f(x) = \\frac{1}{1 + e^{-x}}$$ and Vanishing Gradient",
    back: "Maps inputs to range (0, 1). Disadvantage: extreme values lead to flat curves (derivative approaches zero), causing vanishing gradients where early layers stop training."
  },
  {
    id: 9,
    title: "Dying ReLU vs. Leaky ReLU",
    category: "Domain 1 & 2: Activations",
    front: "$$f(x) = \\max(0, x)$$ vs. $$f(x) = \\max(\\alpha x, x)$$",
    back: "ReLU's derivative is 0 for negative inputs, causing neurons to permanently die. Leaky ReLU adds a small slope (alpha = 0.01) to negative inputs to keep gradients active."
  },
  {
    id: 10,
    title: "Vector Index structures",
    category: "Domain 3: Vector Search",
    front: "HNSW vs. IVF",
    back: "HNSW uses layered navigable proximity graphs for high-precision search skip-lists. IVF clusters vector spaces into voronoi cells and compares only closest centroids to speed up search."
  }
];

function FlashcardText({ text }) {
  if (!text) return null;

  // If it's a pure block formula
  if (text.startsWith('$$') && text.endsWith('$$')) {
    const formula = text.slice(2, -2).trim();
    // Unescape double backslashes in JS string if any
    const cleanFormula = formula.replace(/\\\\/g, '\\');
    return <KaTexMath math={cleanFormula} block={true} />;
  }

  // Parse inline formulas like $W$ or $\eta$
  const parts = [];
  let lastIndex = 0;
  
  // Find all single $...$ matches
  const matches = [...text.matchAll(/\$([^\$]+)\$/g)];
  
  if (matches.length === 0) {
    return <>{text}</>;
  }

  matches.forEach((m, mIdx) => {
    if (m.index > lastIndex) {
      parts.push(text.substring(lastIndex, m.index));
    }
    const cleanInline = m[1].replace(/\\\\/g, '\\');
    parts.push(<KaTexMath key={mIdx} math={cleanInline} block={false} />);
    lastIndex = m.index + m[0].length;
  });

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return (
    <>
      {parts.map((p, idx) => (
        <React.Fragment key={idx}>{p}</React.Fragment>
      ))}
    </>
  );
}

function FlashcardItem({ title, category, front, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flashcard-scene" onClick={() => setFlipped(!flipped)}>
      <div className={`flashcard ${flipped ? 'is-flipped' : ''}`}>
        
        {/* Front Face */}
        <div className="flashcard-face flashcard-front">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>AIF-C01 FRONT</span>
            <span style={{ color: 'var(--accent-cyan)' }}>{category}</span>
          </div>
          <div 
            style={{ 
              textAlign: 'center', 
              fontSize: '1.2rem', 
              fontWeight: 600, 
              color: 'var(--text-primary)',
              margin: '1.5rem 0'
            }}
          >
            <FlashcardText text={front} />
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            🖱️ Click Card to Flip
          </div>
        </div>

        {/* Back Face */}
        <div className="flashcard-face flashcard-back">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>AIF-C01 BACK</span>
            <span style={{ color: 'var(--accent-amber)' }}>{title}</span>
          </div>
          <div 
            style={{ 
              fontSize: '0.9rem', 
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              margin: '1rem 0'
            }}
          >
            <FlashcardText text={back} />
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            🖱️ Click to Flip Back
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Flashcards() {
  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-reading" style={{ fontSize: '0.7rem', marginBottom: '0.75rem', background: 'var(--accent-amber-glow)', color: 'var(--accent-amber)', border: '1px solid var(--accent-amber)' }}>
          Active Recall
        </span>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #ffffff 40%, var(--accent-amber) 100%)', WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }}>
          Math & Glossary Flashcards
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Drill equations, hyperparameters, and security scopes using interactive 3D card deck elements.
        </p>
      </div>

      {/* Grid of flashcards */}
      <div className="flashcard-grid">
        {flashcardsList.map(card => (
          <FlashcardItem 
            key={card.id} 
            title={card.title} 
            category={card.category}
            front={card.front} 
            back={card.back} 
          />
        ))}
      </div>
    </div>
  );
}
