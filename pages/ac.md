# Actor-Critic Network

## Actor

Update parameter based on "Policy Gradient".

$$\nabla_\theta J(\theta)=\mathbb E [\nabla_\theta \log\pi_\theta(a|s)\cdot A(s,a)]$$

where $A^{\pi_\theta}(s,a):=Q^{\pi_\theta}(s,a)-V^{\pi_\theta}(s)$. This $A$ is called "advantage function".


### Derivation

#### REINFORCE
The equation of Policy Gradient.

$$
\begin{equation}\nabla_\theta J(\theta)=\mathbb E_{\tau \sim p_\theta} \lbrack R(\tau)\cdot\sum_{t=0}^{\infty}\nabla_\theta \log\pi_\theta(a_t|s_t)\rbrack
\end{equation}$$

where $R(\tau)=\sum_{k=0}^{T-1}\gamma^kr(s_k,a_k)$.

※ $\tau$ represents a certain trajectory. Therefore, $R(\tau)$ is a fixed value. 

#### REINFORCE → Reward2GO

Let's split the $R(\tau)$ into two terms.

$$
\begin{align}
R(\tau) &= \sum_{k=0}^{T-1}\gamma^k r(s_k, a_k) \\
        &= \sum_{k=0}^{t-1}\gamma^k r(s_k, a_k)+\sum_{k=t}^{T-1}\gamma^k r(s_k, a_k)
\end{align}
$$

Assume you are at time $t$. 

The first term $[\sum_{k=0}^{t-1}\gamma^k r(s_k, a_k)]$ : The past reward. It vanishes as you take expectation.

The second term $[\sum_{k=t}^{T-1}\gamma^k r(s_k, a_k)]$ : The future reward, which is the reward actually obtained after taking action $a_t$, is equivalent to the Q-function.

Therefore, substitute eq(3) into eq(1):

$$\begin{align}\nabla_\theta J(\theta)&=\mathbb E_{\tau \sim p_\theta} \lbrack \sum_{t=0}^{\infty}\sum_{k=t}^{T-1}\gamma^k r(s_k, a_k)\cdot\nabla_\theta \log\pi_\theta(a_t|s_t)\rbrack \\
&= \mathbb E_{\tau \sim p_\theta} \lbrack \sum_{t=0}^{\infty}Q^{\pi_\theta}(s_t,a_t)\cdot\nabla_\theta \log\pi_\theta(a_t|s_t)\rbrack


\end{align}$$

ここで問題になるのは、
$Q^{\pi_\theta}(s_t,a_t)$ (将来の報酬の合計)が分散が非常に大きいということ。
これが学習を不安定・非効率にする。

#### Reward2GO → Baseline method

任意の関数 $b(s)$（通常は状態に依存）を引いても勾配の期待値は変わらないことが知られている。

$$\begin{align}\nabla_\theta J(\theta)
&= \mathbb E_{\tau \sim p_\theta} \lbrack \sum_{t=0}^{\infty}[Q^{\pi_\theta}(s_t,a_t)-b(s)]\cdot\nabla_\theta \log\pi_\theta(a_t|s_t)\rbrack


\end{align}$$


Here, we usually choose value function $V(s)$ as $b(s)$. 

Then we have an Actor-Critic formulation,
$$\begin{align}\nabla_\theta J(\theta)
&= \mathbb E_{\tau \sim p_\theta} \lbrack \sum_{t=0}^{\infty}[Q^{\pi_\theta}(s_t,a_t)-V^{\pi_\theta}(s)]\cdot\nabla_\theta \log\pi_\theta(a_t|s_t)\rbrack


\end{align}$$




### How to calculate Advantage function


$$A^{\pi}(s,a):=Q^{\pi}(s,a)-V^{\pi}(s)$$

1. Monte Carlo method (モンテカルロ法の時)

    We use the actual cumulative reward observed after taking the action, $R_t$, as an estimate of $Q^{\pi}(s,a)$.

    Therefore, we sample rewards of $t\sim {T-1} $ from a trajectory and get cumulative reward:
    $$R_t=\sum_{k=t}^{T-1}\gamma^k r(s_k, a_k)$$

    Thus,

    $$\therefore A(s,a) \approx R - V(s)$$

2. TD

    We approximate $Q$ as 

    $$Q(s,a) \approx r + \gamma V(s')$$

    Thus, 

    $$\therefore A(s,a) \approx r + \gamma V(s') - V(s)$$

    This is equivalent to TD $\delta(\lambda)$. 

    :::note
    理論的には、方策 $\pi$に従うときの Q関数は：

    $$Q^\pi(s,a)=\mathbb E [r_t + \gamma V^\pi(s_{t+1})]$$

    実際の学習中は「期待値」を計算できない。よって、サンプルで近似する。つまり、実際に１ステップ行動したときのサンプル$(s,a,r,s')$に対して、
    $$Q(s,a) \approx r + \gamma V(s')$$
    :::

3. GAE

    TD only considers one step ahead for approximation.

    



