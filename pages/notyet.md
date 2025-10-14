# だたいま作成中

ちょっと待ってね

$$
\mathcal{L} = \mathbb{E}_{q(z|x)}[\log p(x|z)] - D_{KL}(q(z|x) || p(z))
$$

:::note
VAE uses a latent distribution to encode inputs.
:::

:::tip
Always normalize your inputs for better performance.
:::

:::warning
Do not forget to tune the KL term weight.
:::