# MPC pre-requirement basics

## Lyapunov function

![Sample image](imgs/lyapunov.png "Sample imgs")

システムが安定に向かっているかどうかを判定するために使う“エネルギーみたいな関数”.

1. 正定値

    平衡点以外では $V(x)>0$

    平衡点では $V(0)=0$

2. 時間微分が負（減っていく）$V(f(x)) = V(x^+) < V(x)$ が成立する → エネルギーが減っていくので、状態は平衡点に近づく

The basic way of finding the Lyapunov function for the system of $x^+ = Ax$ is: 

* Define $V(x)  = x^TPx$ where $P \succ 0$
* Then, find $P$ that satisfies $A^TPA-P \prec -Q, ~\exists Q\succ 0$. 

This is because the $V(x)$ should satisfy the following:

$$V(x^+) = V(Ax) = x^TA^TPAx \leq V(x) = x^TPx$$

基本このリアプノフ関数を求めるのは困難。

## Convex optimization

[Here](page.html?topic=conv_opt_problem)

## Constrained Minimization: Interior-point Methods

...

## Invariance set 

## Controlled Invariance set
