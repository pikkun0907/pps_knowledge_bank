# Robust MPC

## Openloop Robust MPC vs Closedloop Robust MPC

* Open-loop: 未来のworst-case全部に耐えられる唯一の入力を決める $\rightarrow$ Conservative
* Closed-loop: 未来でもフィードバックで修正できる前提


## Closed-loop Robust MPC

$$
x^+ = f(x,u) + w 
$$

Controller chooses his move $u$. Disturbance decides on his move $w$ **after seeing the controller's move**.

1. Controller decides his first move $u_0$
2. Distrubance chooses his first move $w_0$
3. Controller decides his second move $u_1(x_1)$ as a function of the first disturbance $w_0$
4. Disturbance chooses his second move $w_1$ as a function of $u_1$
5. ...


We want to optimize over a **sequence of functions** $ \{ u_0, \mu_1(\cdot), \cdots, \mu_N-1(\cdot)\}$, where $\mu_i(x_i): \mathbb R^n \rightarrow \mathbb R^m$ is called a **control policy**.

This maps the state at time $i$ to an input at time $i$.

### Assumption for some structure on the functions $\mu_i$

![Sample image](imgs/robustmpc1.png "Sample imgs")

Here, we will cover tube-MPC.

## Tube-MPC

$$
x^+ = Ax + Bu + w 
$$

where $(x, u) \in \mathbb X \times \mathbb U, w\in\mathbb W$.

