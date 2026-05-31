# 📈 Traditional ML Algorithms: From Trendlines to Hyperplanes

Traditional machine learning algorithms are the workhorses of data science. Before deep learning took over, these math-based models were used to draw boundaries, group data points, and make predictions on structured, tabular data. They are fast, cost-effective, and highly interpretable.

---

## 1. 📏 Regression: Predicting Numbers
Think of regression like drawing a trendline on a scatter plot of data. The goal is to find a line or curve that sits as close as possible to all your data points:

*   **Simple Linear Regression:** Fits a straight line to minimize the sum of squared errors between predictions and actual values:
```math
Y = \beta_0 + \beta_1 X + \epsilon
```
    where $\beta_0$ represents the intercept, $\beta_1$ is the slope coefficient, and $\epsilon$ represents the random error. The model uses Ordinary Least Squares (OLS) to find the best line.
    *   *Simple Linear Regression Example:* Predicting a household's monthly electricity bill ($Y$) based on the average daily temperature ($X$). The intercept $\beta_0$ represents the base monthly grid connection cost, $\beta_1$ is the rate of cost increase per degree of temperature (due to air conditioning usage), and OLS minimizes the squared distances between the predicted line and the historical billing data.
*   **Multiple Linear Regression:** Extends the trendline to handle multiple features:
```math
Y = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \dots + \beta_n X_n + \epsilon
```
    Instead of a flat line, it calculates a multi-dimensional hyperplane of best fit.
    *   *Multiple Linear Regression Example:* Predicting a car's fuel efficiency in miles per gallon ($Y$) using multiple input features: engine size in liters ($X_1$), vehicle curb weight ($X_2$), and aerodynamic drag coefficient ($X_3$). The model estimates coefficient weights for each feature to output the predicted fuel efficiency.
*   **Polynomial Regression:** Models curved relationships by adding exponential terms of your features:
```math
Y = \beta_0 + \beta_1 X + \beta_2 X^2 + \dots + \beta_k X^k + \epsilon
```
    This allows a linear model to capture curves, including acceleration trends.
    *   *Polynomial Regression Example:* Predicting agricultural crop yield ($Y$) based on nitrogen fertilizer application volume ($X$). Initial applications increase crop yield linearly, but after an optimal threshold, excess nitrogen burns the crops, reducing the yield. Adding a quadratic feature term ($X^2$) allows the model to fit this parabolic curve.
*   **Support Vector Regression (SVR):** Think of this like building a paved road of a certain width, known as the $\epsilon$-insensitive tube. SVR tries to fit as many data points as possible *inside* this road, and it only penalizes points that fall outside the boundaries.
    *   *SVR Example:* Predicting stock prices where minor noise fluctuations within a \\$2.00 threshold are ignored. By setting the $\epsilon$-insensitive tube to $2.0$, SVR ignores training point errors that fall within this \\$2.00 buffer, updating parameter weights only when points drift outside this boundary.

---

## 2. 🔀 Classification: Drawing Boundaries
Classification is the process of drawing walls or boundaries to separate data into categories:

*   **Logistic Regression:** Think of this like a light switch with a dimmer. It maps real-valued inputs to a probability between $0$ and $1$ using the sigmoid function:
```math
P(Y=1 \vert X) = \sigma(z) = \frac{1}{1 + e^{-z}}
```
    where $z = w^T x + b$. If the probability is above a threshold, including $0.5$, we assign the sample to the positive class.
    *   *Logistic Regression Example:* Predicting if a credit card transaction is fraudulent (Fraud = 1, Legitimate = 0). The model processes transaction features and outputs a probability score of $0.85$. Since this is above the default decision threshold of $0.5$, the system automatically flags the transaction.
*   **K-Nearest Neighbors (KNN):** Think of this like asking your nearest neighbors for advice. To classify a point, KNN finds the $k$ closest samples in your training set and takes a majority vote. The distance is calculated using:
    *   *Euclidean Distance:* $d(x, y) = \sqrt{\sum (x_i - y_i)^2}$
    *   *Manhattan Distance:* $d(x, y) = \sum \vert x_i - y_i \vert$
    *   *Minkowski Distance:* A generalized distance metric defined as:
```math
d(x, y) = \left( \sum_{i=1}^n |x_i - y_i|^p \right)^{1/p}
```
        where $p \ge 1$ is a parameter.
> [!NOTE]
> **Minkowski Trick:** This is a bit of a headache, but here is the trick: Minkowski is a generalized formula. If you set $p = 1$, it collapses mathematically into Manhattan distance. If you set $p = 2$, it collapses into Euclidean distance.
    *   *Hamming Distance:* $d(x, y) = \sum \mathbb{I}(x_i \neq y_i)$, which counts the number of differences between categorical values.
    *   *KNN Distance Metrics Example:* Recommending movie genres based on user age and streaming hours. If a user is located near $k = 5$ neighboring profiles on a spatial grid, and $4$ of those neighbors stream Action movies, the model assigns the class label "Action" to the user. Euclidean computes straight-line distance, Manhattan computes grid-line distance, Minkowski generalizes them using parameter $p$, and Hamming compares categorical profiles (for example, comparing `["Premium", "Active"]` with `["Standard", "Active"]` yields a Hamming distance of $1$).
*   **Support Vector Machine (SVM):** Finds the widest street that separates two classes of data points. If the classes are mixed together, it uses the **kernel trick** to project the data into a higher dimension where they can be separated by a flat plane. A popular option is the Radial Basis Function (RBF) kernel:
```math
K(x, y) = \exp(-\gamma \|x - y\|^2)
```
    *   *SVM Example:* Classifying emails as Spam or Ham. The SVM draws a boundary line that maximizes the margin (separation distance) between the closest spam and safe emails (the support vectors). If spam and safe emails are mixed together in $2\text{D}$ space, the RBF kernel projects the data into a higher-dimensional space where a flat sheet of paper (hyperplane) can cleanly partition them.
> [!TIP]
> **Kernel Analogy:** Imagine putting blue and red marbles on a table, all mixed up. You cannot draw a straight line to separate them. But if you hit the table from underneath so they bounce up into the air (a higher dimension), you could easily slide a sheet of paper (a hyperplane) between them.
*   **Decision Tree:** Works like a game of $20$ Questions. It splits data at feature thresholds to maximize the purity of the resulting groups.
    *   *Entropy:* $H(S) = -\sum p_i \log_2 p_i$ (measures randomness).
    *   *Gini Impurity:* $G(S) = 1 - \sum p_i^2$ (measures classification error probability).
    *   *Information Gain:* $IG(S, A) = H(S) - \sum \frac{|S_v|}{|S|} H(S_v)$ (measures the reduction in randomness after a split).
    *   *Decision Tree Example:* Predicting if a website visitor will buy a product. The tree splits on the feature `"Visited Pricing Page = True"`. If the parent Gini impurity was $0.50$ (representing an even split of buyers and non-buyers) and the split creates children nodes with an average Gini impurity of $0.15$, the Information Gain is $0.35$, confirming a highly useful split.
*   **Random Forest:** An ensemble method that trains a crowd of decision trees on random subsets of the data and features. It takes the average prediction of the trees to reduce variance.
    *   *Random Forest Example:* Predicting home valuation. Instead of relying on a single decision tree that might overfit to noise in one neighborhood, a Random Forest trains 100 different trees on bootstrap samples of the housing data and averages their predictions to output a robust valuation.
*   **Naive Bayes:** Calculates probability using Bayes' Theorem:
```math
P(\text{Class} \vert \text{Features}) \propto P(\text{Class}) \prod P(\text{Feature}_i \vert \text{Class})
```
    It is called "naive" because it assumes all features are completely independent of each other.
    *   *Naive Bayes Example:* Spam filtering based on words in a message. The model calculates the probability that an email is spam given that it contains both the words "wire" and "funds", assuming that the occurrence of "wire" is independent of the occurrence of "funds".

---

## 3. 👥 Clustering: Grouping Unlabeled Data
Clustering groups unlabeled data points based on spatial closeness:

*   **K-Means:** Partitions data into $K$ groups. It initializes $K$ center points (centroids), assigns each data point to its closest centroid using Euclidean distance, and recalculates the centroid coordinates as the average of the group. The loop runs until centroids stop shifting.
    *   *K-Means Example:* Segmenting a customer database. The model initializes $K=3$ centroids representing low, medium, and high spenders. Customers are grouped by proximity to these centroids, and the coordinates are updated iteratively until the clusters stabilize.
> [!WARNING]
> **Centroid Distortion:** Outliers can pull centroids far away from their true groups. You must define $K$ in advance, which is typically found by plotting within-cluster variance and finding the "elbow" point.
*   **DBScan:** Groups points based on local density. It looks for core points that have a minimum number of neighbors (`minSamples`) within a specified radius (`eps`). Points that are isolated are marked as noise.
    *   *DBScan Example:* Grouping warehouse delivery locations. DBScan clusters addresses where at least `minSamples = 5` addresses are located within a search radius of `eps = 100` meters, allowing it to find arbitrary street-shaped clusters while marking isolated rural houses as noise.
*   **K-Modes:** An extension of K-means designed for categorical data, using modes and matching distance metrics instead of averages and Euclidean distance.
    *   *K-Modes Example:* Clustering patient health profiles using categorical attributes, including Blood Type (`A`, `B`, `AB`, `O`) and Gender (`Male`, `Female`), and grouping them based on matching modes.

---

## 4. 🔗 Association Rule Learning
Association Rule Learning is a rule-based unsupervised learning method used to discover interesting relations and co-occurrences between variables in large transaction datasets:

*   **Support:** Measures how frequently a specific itemset appears in the database.
```math
\text{Support}(A \implies B) = P(A \cap B) = \frac{\text{Transactions containing both } A \text{ and } B}{\text{Total Transactions}}
```
*   **Confidence:** Measures how often the rule is found to be true (the conditional probability of $B$ given $A$).
```math
\text{Confidence}(A \implies B) = P(B \vert A) = \frac{\text{Support}(A \cap B)}{\text{Support}(A)}
```
*   **Lift:** Measures the strength of the rule over random chance. A Lift $> 1$ indicates that $A$ and $B$ are positively correlated, while a Lift $< 1$ means they are negatively correlated.
```math
\text{Lift}(A \implies B) = \frac{P(A \cap B)}{P(A)P(B)} = \frac{\text{Support}(A \cap B)}{\text{Support}(A) \times \text{Support}(B)}
```
    *   *Association Rule Example (Market Basket Analysis):* A supermarket scans transaction records to find buying patterns. The algorithm uncovers the rule `"If bread, then butter"` ($A \implies B$). Out of $10,000$ transactions, $1,000$ contain both items (Support = $10\%$). Among the $2,000$ transactions containing bread, $1,000$ also contain butter (Confidence = $50\%$). If the overall probability of buying butter is $20\%$, the Lift is $0.50 / 0.20 = 2.5$, meaning customers who buy bread are $2.5$ times more likely to buy butter than random shoppers.
> [!WARNING]
> **Association Gotcha:** Spurious correlations. If you have thousands of unique items, you will find high-confidence rules purely by random chance on rare item combinations. To avoid this, you must set strict minimum thresholds for Support and Lift to prune out statistically insignificant relationships.

---

## 5. 🗜️ Dimensionality Reduction
*   **PCA (Principal Component Analysis):** Projects multi-dimensional data onto orthogonal axes that capture the highest variance. Think of it like taking a $2\text{D}$ photograph of a $3\text{D}$ object from an angle that keeps the most detail.
    *   *PCA Example:* You have a customer feedback dataset with 50 features representing satisfaction scores. PCA projects these features onto 2 orthogonal axes (principal components) that capture $90\%$ of the variance, letting you plot the customer clusters on a simple $2\text{D}$ chart.
*   **SVD (Singular Value Decomposition):** Decomposes a matrix $A$ into three matrices $U \Sigma V^T$ to extract core structures, which is useful for recommendation engines.
    *   *SVD Example:* Collaborative filtering in movie recommendations. SVD decomposes a user-movie rating matrix into user-concept and movie-concept matrices, identifying latent tastes (for example, a user's affinity for sci-fi movies) to suggest new films.
*   **Linear Discriminant Analysis (LDA):** A supervised method that reduces dimensions while maximizing class separation.
    *   *LDA Example:* Projecting 10-dimensional medical diagnostic features down to a 1-dimensional line that maximizes the visual distance between "healthy" and "diseased" classes.

---

## 6. 🛠️ AWS Platform Implementations

AWS integrates these algorithms into managed service configurations:

*   **SageMaker Built-in Algorithms:**
    *   *SageMaker Linear Learner:* Used to train linear regression or binary classification models.
    *   *SageMaker XGBoost:* Distributed gradient boosted decision trees.
    *   *Built-in Algorithm Example:* Pointing the SageMaker XGBoost built-in container to an S3 bucket containing credit card applicant history in CSV format to train a classification model predicting default rates.
*   **SageMaker Autopilot & Canvas:**
    *   *Tabular Configurations:* Requires data uploaded to S3 in CSV format.
    *   *AutoML Example:* An engineer uploads a tabular dataset of customer churn to SageMaker Autopilot, selects the target column `"Churn"`, and Autopilot automatically runs 50 training jobs using XGBoost, Random Forests, and Linear Learners, tuning hyperparameters to output the best model.

---

## 7. 📊 Tool Selection: K-Means vs. DBScan vs. PCA

| Metric | K-Means | DBScan | PCA |
| :--- | :--- | :--- | :--- |
| **Goal** | Group data into spherical clusters. | Find clusters of arbitrary shapes. | Reduce the number of features. |
| **Key Settings** | Number of clusters ($K$). | Search radius (`eps`), density limit (`minSamples`). | Number of principal components. |
| **Outliers** | Sensitive; outliers pull centroids. | robust; filters outliers as noise. | retains outliers but projects variance. |
| **Use Case** | Grouping customers into $5$ spend levels. | Identifying geographical crime hotspots. | Shrinking $100$ features down to $5$ components. |
