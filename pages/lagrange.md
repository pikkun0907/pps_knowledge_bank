# Lagrange Duality

## Lagrange formulation

:::theory
P:

$$\text{minimize} f_0(x) ~~ s.t. ~~ f_i(x)\le0, h_i(x) =0$$
:::

### Lagrangian

:::theory
$$\mathcal L (x,\lambda, \mu) = f_0(x) + \sum_{i}^m \lambda_if_i(x)+\sum_{i=0}^p\mu_ih_i(x)$$

$\lambda_i\in \mathbb R_+^m$ and $\mu_i\in \mathbb R^p$ are lagrange multipliers.

:::

### Proposition
* If P is convex opt problem, the lagrangian is convex in x for any fixed ($\lambda, \mu$).
* ($\lambda, \mu$) are choosen to maximize $\mathcal L (x,\lambda, \mu)$, thus the optimizer is at saddle point.

## Primal Problem

:::theory

$$f(x) = \sup_{\lambda\in \mathbb R_+^m, \mu\in \mathbb R^p} \mathcal L(x,\lambda, \mu)$$

$$\inf \text{P} = \inf_{x\in\mathbb R^n}f(x)=\inf_x\sup_{\lambda, \mu}\mathcal L(x,\lambda,\mu)$$

:::



:::idea

$$
f(x) = \left\{
\begin{array}{ll}
  f_0(x) & \text{if} ~~f_i(x)\le , ~~h_i(x)=0 \\
  \infty & \text{o.w.}
\end{array}
\right.
$$

もし、$f_i(x)$の制約を守っているとき、$f_0(x)\ge \mathcal L(x, \lambda, \mu)$となる。lagrangianは常にもとの目的関数の<mark>下界</mark>になる。

制約を満たしているところは、$\sum\lambda_iF_i$が０以下になる。その中で、$\mathcal L$を最大化したなら、$\lambda_i$は自ずと０を取る。

よって、$\sup_{\lambda, \mu}\mathcal L(x,\lambda,\mu)$は、$f_0$に一致する。

$g(\lambda)=\inf_x\mathcal L (x,\lambda)$を定義して、たくさんある、下界のなかから、一番高い下界を取ることにしたのがdual problem.

:::

## Dual problem

:::theory

$$g(x) = \inf_{x} \mathcal L(x,\lambda, \mu)$$

$$\sup \text{D} = \sup_{\lambda, \mu}g(\lambda, \mu)=\sup_{\lambda, \mu}\inf_x\mathcal L(x,\lambda,\mu)$$

:::

### Weak duality

$$
g(\lambda, \mu)
= \inf_{\hat{x}} \mathcal{L}(\hat{x}, \lambda, \mu)
\le \mathcal{L}(x, \lambda, \mu)
\le \sup_{\substack{\hat{\lambda} ,~ \hat{\mu}}} \mathcal{L}(x, \hat{\lambda}, \hat{\mu})=f(x)
$$

![weak duality](imgs/weak_duality.png)

### Strong Duality 

If $\inf P =\sup D=0 $, then it holds strong duality.

* Always hold if P is a convex problem satisfying a <mark><constraint qualification</mark>. 

:::note

Slater's constraint qualification holds if thereexists $x_s$ with

$$f_i(x_s)< 0$$
$$h_i(x_s)=0$$

:::

## Dual cones

:::theory
If $K$ is a cone, then the set

$$K^* ={y\in\mathcal R^n : x^Ty\ge 0, \forall{x}}\in K$$

is the dual cone of $K$.
:::

![dualcone](imgs/dualcone.jpg)

### Proposition

* $K^*$ is closed and convex
* $K_2 \subseteq　K_1 \Rightarrow  K_1^* \subseteq　K_2^* $
* $K^{**}=\text{cl}(\text{conv}(K))$

$\text{conv}(K)$: Kを内包した最小の閉包  /      $\text{cl}(A)$ : Aを含む最小の閉集合

:::note
$K^{**}$ は「凸かつ閉」な形に整える操作になる。$K$がconvexでなくても良い。

$K^{*}$は、もともと必ず凸かつ閉

$K^{**}$は、もとの$K$の凸かつ閉な部分だけ生き残る

If $K$ is proper convex, then $K^*$ is proper and $K=K^{**}$
:::






