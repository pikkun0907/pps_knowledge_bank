# Variational Autoencoder (VAE)

VAEは確率的生成モデルの一種であり、潜在変数$z$からデータ$x$を生成する確率分布$p(x|z)$を学習します。

## 構造
- Encoder: $q_\phi(z|x)$ を学習し、入力を潜在空間にマッピング  
- Decoder: $p_\theta(x|z)$ を学習し、潜在変数からデータを再構成

## 損失関数
再構成誤差とKLダイバージェンスの和：
$$
L = \mathbb{E}_{q_\phi(z|x)}[\log p_\theta(x|z)] - D_{KL}(q_\phi(z|x)\|p(z))
$$

## 関連
- [VQVAE](../page.html?topic=vqvae)
- [PPO](../page.html?topic=ppo)
