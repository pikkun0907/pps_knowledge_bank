# LQR and MPC

LQR：高速で計算できる、制約のない最適制御の“閉形式解”

MPC：制約を入れられる、より柔軟な最適制御の“汎用ソルバー”

MPC は LQR を一般化した手法であり，LQR は制約のない場合の MPC の特別ケース。

## Linear Quaduratic Reguraltor (LQR)
We have the system of $x^+ = Ax + Bu$.

**Goal: Move from state $x$ to the origin while minimizing the cost.**

By solving the problem, we will get the optimal sequence of inputs: $\mathbf u = \{u_0, \cdots, u_{N-1}\}$.

The cost function:

$$I(x,u)=x^TQx + u^TRu$$

where $Q\succeq0$ and $R\succ 0$.

Therefore, we are minimizing the enrgy in the input and output signals. 

### Dynamic programming

:::note
Pros: Leads to elegant closed-form solution for LQR. Provide a solution when $N \rightarrow \infty$.

Cons: Virtually no problems have simple, closed-form solutions

:::

#### Finite horizon LQR

Hirizon of $N$.

![Sample image](imgs/lqr1.png "Sample imgs")

![Sample image](imgs/lqr2.png "Sample imgs")




#### Infinite horizon LQR

Bellman equation:

![Sample image](imgs/lqr3.png "Sample imgs")

![Sample image](imgs/lqr4.png "Sample imgs")


#### Bellman recursion
```python
def bellman(N: int)-> list[np.ndarray]:
    Klist = []
    H = Q
    for _ in range(N):
        K = -(np.linalg.inv(R + B.T@H@B)@B.T@H@A)
        Klist.append(K)
        H = Q + A.T@H@A + A.T@H@B@K
   
    return Klist[::-1]

```

Usually, you use only `Klist[-1]` for all controll $u =Kx$. This is closed-loop. 

Instead, if you use all `K` in `Klist`(You need to inverse the order by [::-1]), the controller becomes open-loop and the behavior is unstable. 

If you set the horizon long enough, you can get good `K`.

Usually you can use package to get the gain `K` of infinite horizon.

```python
K, P, E = ct.dlqr(A, B ,Q, R)
K = - K 
print("Infinite-horizon LQR gain K:\n", K)
```


## MPC

The biggest advantage of MPC is we can deal with constraints on top of the LQR settings.

What we want to solve is the following,

:::theory

Infinite horizon optimal control
$$
\begin{split}
V^*(x_0) &= \min \sum_{i=0}^\infty I (x_i,u_i)\\
s.t. ~~~& x_{i+1} = f(x_i,u_i)\\
&(x_i,u_i) \in \mathbb X, \mathbb U
\end{split}

$$
:::

BUT this is infeasible to solve since it contains infinite horizon.

<mark>Therefore, we should consider the finite horizon problem and the **terminal cost and terminal set** and put it in the formulation.</mark>

:::theory

Infinite horizon optimal control
$$
\begin{split}
V^*(x_0) &= \min \sum_{i=0}^{N-1} I (x_i,u_i)+V_f(x_N)\\
s.t. ~~~& x_{i+1} = f(x_i,u_i)\\
&(x_i,u_i) \in \mathbb X, \mathbb U\\
&x_N \in \mathcal X_f
\end{split}

$$
:::




