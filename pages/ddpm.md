# Diffusion model : DDPM

## Useful Learning Material

:::youtube
https://www.youtube.com/watch?v=EhndHhIvWWw
:::

## Forward Diffusion

The main idea of the forward diffusion process is to add small noise at each time step. The naive way is the following way.
First, you have the original data $x_0$. At the next time step, we update it with $x_1 = x_0 + \beta\epsilon$, where $\epsilon ~ \mathcal(N)(0, 1)$. You can repeat one more time, and you will get $x_2 = x_1 +\beta\eplison = x_0 + 2\beta\eplison$. Then, you can easily imagine that $x_t = x_0 +t\beta\epsilon$.  
