# Trust Region Policy Optimization: TRPO

## Original Paper

:::paper
TRPO - https://arxiv.org/abs/1502.05477
:::

## Basic Idea 

You should understand everything about Actor-Critic Network first.

If not, please read [this page](page.html?topic=ac) first.

The main problem of Actor-Critic network is when update actor network parameter $\theta$ with policy gradient, the gradient might be very large and the policy before and after becomes very different.

:::note

Policy gradient : $\nabla_\theta J(\theta)\approx\nabla_\theta \log\pi_\theta(a|s)\cdot A_t(s,a)$

:::



Therefore, we need to limit the size of the gradient.

The idea of TRPO is to use a trust region to limit the size of the gradient. It is really simple!!!

## How to regurate the size of the gradient in TRPO

Recall that the update rule of policy gradient is

:::theory

3. Update Actor prameter $\theta$

    Advantage function: $ A_t(s,a)$

    Calculate gradient : $\nabla_\theta J(\theta)\approx\nabla_\theta \log\pi_\theta(a|s)\cdot A_t(s,a)$

    Update $\theta \leftarrow \theta -\beta\nabla_\theta J(\theta)$

:::

