# Diffusion model : DDPM

## Useful Learning Material

:::youtube
https://www.youtube.com/watch?v=EhndHhIvWWw
:::

## Forward Diffusion
### What’s the idea?

The forward diffusion process is all about slowly adding a bit of random noise to your data step by step, until it turns into pure noise.

Let’s first look at a simple (but wrong) way to do it — then we’ll fix it.

### ❌ Naive Formulation (Incorrect)

First, you have the original data distribution $x_0$. At the next time step, we update it with $$x_1 = x_0 + \beta\epsilon$$
where $\epsilon \sim \mathcal N(0, 1)$ and $\beta \in [0,1]$. The equivalent expression is

$$q(x_1|x_0) = \mathcal N (x_0, \beta)$$
(if you do not understand this transformation, ask chatgpt.)

You can repeat one more time, and you will get 
$$x_2 = x_1 +\beta\epsilon = x_0 + 2\beta\epsilon$$

$$ \therefore  q(x_2|x_0) = \mathcal N (x_0, 2\beta) $$
Then, you can easily imagine that at time $t$ 

$$x_t = x_0 +t\beta\epsilon$$
$$ \therefore  q(x_t|x_0) = \mathcal N (x_0, t\beta) $$

However, this formulation doesn’t work for a proper forward diffusion process. The problems are:

:::theory

(1) The variance $t\beta$ keeps growing without bound, which makes the distribution unstable.

(2) The mean stays tied to the original data $x_0$, so the samples always “remember” the initial image.
:::

What we actually want in a diffusion model is to eventually generate a new sample from pure noise.
That means, after many steps, the noisy sample should follow a simple, known distribution.

In practice, we usually choose the standard Gaussian: $\mathcal N(0,1)$

So the goal is: $q(x_t|x_0) \rightarrow \mathcal N(0,1)$ as $t \rightarrow \infty $


This way, the data eventually turns into pure noise, which is essential for the reverse diffusion process.


### Variance Preserving Forward Diffusion

Here is the correct forward diffusion process.

As I mentioned, we want $q(x_t|x_0) \rightarrow \mathcal N(0,1)$ as $t \rightarrow \infty $.

To make the process stable, we scale both the signal and the noise carefully at each step:

$$q(x_1|x_0) = \sqrt{1-\beta}x_0 + \beta\epsilon$$

where $\epsilon \sim \mathcal N(0, 1)$ and $\beta \in [0,1]$.

This way, we shrink the original signal a bit (by multiplying with $\sqrt{1-\beta}$) while adding a bit of noise.
This keeps the total variance stable — that’s why it’s called variance-preserving.

Therefore, at time $t$, we have

$$q(x_t|x_0) = \sqrt{\bar\alpha_t}x_0 + (1-\bar\alpha_t)\epsilon
$$

where $\bar\alpha_t = (1-\beta)^t$

:::note
If $\beta$ is time dependent, we can formulate $\bar\alpha_t = \prod_{s=1}^t (1-\beta_s)$
:::


As $t$ increases:

$$(1-\beta)^t \rightarrow 0$$

which means

$$\sqrt{\bar\alpha_t} \rightarrow 0 ~~\text{and}~~1-\bar\alpha_t \rightarrow 1$$

Therefore,

$$q(x_t|x_0) \rightarrow \mathcal N(0,1)$$

So, as time goes on, the image (or data) becomes pure Gaussian noise — exactly what we want!

Yayyyy:)))






## Whole view
