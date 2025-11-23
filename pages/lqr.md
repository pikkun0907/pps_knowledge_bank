# LQR vs MPC

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

### LQR solution Methods

**Dynamic programming**

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