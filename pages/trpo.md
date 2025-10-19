# Trust Region Policy Optimization: TRPO

## Original Paper

:::paper
TRPO - https://arxiv.org/abs/1502.05477
:::

## Basic Idea 

You should understand everything about Actor-Critic Network first.

If not, please read [this page](page.html?topic=ac) first.

The main problem of Actor-Critic network is when update actor network parameter $\theta$ with policy gradient, the gradient might be very large and the policy before and after becomes very different.



Therefore, we need to limit the size of the gradient.

The idea of TRPO is to use a trust region to limit the size of the gradient. It is really simple!!!

## How to regurate the size of the gradient in TRPO

Recall that the update rule of policy gradient is

:::theory

$$\nabla_\theta J(\theta)=\mathbb E [\nabla_\theta \log\pi_\theta(a|s)\cdot A(s,a)]$$

:::

In algorithm, the loss function is explicitly written as $J(\theta) \approx\log\pi_\theta​(a​∣s​)A_t(s,a)​$ but this is because we iterate the policy gradient until the loss function converges.

Here, we expless the loss as

$$J(\theta)\approx\mathbb E_{t}  ​[\log\pi_\theta​(a​∣s​)A_t(s,a)​]$$

