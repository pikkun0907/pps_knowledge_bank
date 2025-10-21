# Convex Optimization Problem

![img](imgs/convex_problems.png)

## Convex Opt problem

:::theory

$P$: 
$$
\begin{align}
\text{minimize}& ~~ f_0(x) \\
s.t.& ~~ f_i(x)\le 0 , ~~Ax=b
\end{align}
$$

:::

Equivalent expression:

:::theory
$P'$: 
$$
\begin{align}
\text{minimize}& ~~ t\\
s.t.& ~~ f_0(x)\le t,~~f_i(x)\le 0 , ~~Ax=b
\end{align}
$$
:::

$P \iff P'$. 

$f_0(x)$ and $f_i(x)$ are convex. 

<mark>The feasible set of a convex optimization problem is convex.</mark>

## Linear Program (LP)

:::theory

$$
\begin{align}
\text{minimize}& ~~ c^Tx+d\\
s.t.& ~~ Cx\le g , ~~Ax=b
\end{align}
$$

:::

## Quadratic Program (QP)

:::theory

$$
\begin{align}
\text{minimize}& ~~ \frac{1}{2}x^TPx+q^Tx+r\\
s.t.& ~~ Cx\le g , ~~Ax=b
\end{align}
$$

:::

## Quadratically Constrained QP (QCQP)
:::theory

$$
\begin{align}
\text{minimize}& ~~ \frac{1}{2}x^TP_0x+q_0^Tx+r_0\\
s.t.& ~~ \frac{1}{2}x^TP_ix+q_i^Tx+r_i \le0, ~~ i=1,\cdots, m
\end{align}
$$

:::

:::example

(ex) Distance between ellipsoids

$$
\begin{align}
\text{minimize}& ~~ ||x_1-x_2||_2^2\\
s.t.& ~~ (x_1-\mu_1)^T\Sigma_1^{-1}(x_1-\mu_1) \\
&~~(x_2-\mu_2)^T\Sigma_2^{-1}(x_2-\mu_2) 
\end{align}
$$

:::

Memo: 
$||x_1-x_2||_2^2 = (x_1-x_2)^T(x_1-x_2)$


## Second-Order Cone Program (SOCP)

:::theory

$$
\begin{align}
\text{minimize}& ~~ f^Tx\\
s.t.& ~~ ||A_ix-b_i||_2\le c_i^Tx+d_i, ~~Fx=g
\end{align}
$$

:::

### Proposition
<mark>Every LP is a SOCP with $A_i=0, b_i=0$</mark>


<mark>Every QCQP is a SOCP with $c_i=0$</mark>

### Hidden SOCP constraints

:::idea

$$||x||_2^2\le t \iff ||(2x, t-1)||_2 \le t+1$$
$$||x||_2^2\le st, ~ s\ge0, ~t\ge0 \iff ||(2x, s-t)||_2\le s+t, ~s\ge0$$
:::


## Semidefinite Program (SDP)

:::theory

$$
\begin{align}
\text{minimize}& ~~ c^Tx\\
s.t.& ~~ F_1x_1+\cdots + F_nx_n\preceq G, ~~ Ax=b
\end{align}
$$

where $F_1,\cdots,F_n, G \in \mathbb S^k$

:::

### Every SOCP is an SDP

SOCP is

$$
\begin{align}
\text{minimize}& ~~ f^Tx\\
s.t.& ~~ ||A_ix-b_i||_2\le c_i^Tx+d_i, ~~Fx=g
\end{align}
$$

is equivalent to 

$$||A_ix-b_i||_2\le c_i^Tx+d_i\iff \begin{pmatrix} c_i^Tx+d_i & (A_ix-b_i)^T \\ A_ix-b_iI & (c_i^Tx+d_i)I \end{pmatrix} \succeq 0$$

:::note
From Shur's lemma:

$$\begin{pmatrix} \alpha & \beta^T \\ \beta & \alpha I \end{pmatrix} \iff \alpha \ge \beta^T\alpha^{-1}I\beta \iff \alpha^2\ge||\beta||_2^2\iff\alpha \ge||\beta||_2$$
:::
### Every LP is an SDP

LP is

$$
\begin{align}
\text{minimize}& ~~ c^Tx+d\\
s.t.& ~~ Cx\le g , ~~Ax=b
\end{align}
$$

is equivalent to

$$
\begin{align}
\text{minimize}& ~~ c^Tx+d\\
s.t.& ~~ \begin{pmatrix} \text{diag}(b-Ax) &  &\\  & \text{diag}(Ax-b) &\\ & & \text{diag}(g-Cx)\end{pmatrix}\succeq 0
\end{align}
$$

:::example
(ex) Eigenvalue Minimization
$$
\begin{align}
\text{minimize}& ~~ \lambda_{max}(A(x))\\

\end{align}
$$
where $A(x) =A_0+A_1x_1 + \cdots +A_nx_n$, $A_i\in\mathbb S^k$.

This is equivalent to the SDP
$$
\begin{align}
\text{minimize}& ~~ \{ t: A(x) \preceq tI\}\\

\end{align}
$$

:::

### Hidden SDP Constraints

:::idea

$$X\succeq Y^{-1}\iff \begin{pmatrix} X&I\\ I &  Y \end{pmatrix}\succeq 0 $$

$$X\succeq YY^T \iff \begin{pmatrix} X&Y\\ Y^T &  I \end{pmatrix}\succeq 0 $$

$$(AXB)^TAXB+CXD+(CXD)^T\succeq Y\iff \begin{pmatrix} Y-CXS-(CXD)^T&(AXB)^T\\ AXB &  I \end{pmatrix}\succeq 0 $$

:::