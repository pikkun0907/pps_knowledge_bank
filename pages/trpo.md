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

方策勾配の基本式 : $$J(\theta)=\mathbb E_{s\sim d^\pi,a\sim\pi_\theta}  [ A(s,a)]$$

方策勾配定理により

$$\nabla_\theta J(\theta)=\mathbb E _{s,a\sim\pi_\theta} [\nabla_\theta \log\pi_\theta(a|s)\cdot A(s,a)]$$

:::


$$J(\theta)\approx\mathbb E_{t}  ​[\log\pi_\theta​(a​∣s​)A_t(s,a)​]$$

