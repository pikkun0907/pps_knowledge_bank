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

Separate the avialiable control authority into two parts:

1. Noise free system: $z^+ = Az +Bv$
2. Error between real($x$) and nominal($z$) state: $e^+ = (A+BK)e+w$

---

We have **nominal system**, noise-free system:

$$z_{i+1} = Az_i+Bv_i$$

Define a **tracking controller**, to keep the real trajectory close to the nominal,

$$u_i = K(x_i-z_i)+v_i$$

This is the controll policy for tube-MPC. Ckeck the picture above again.

Define the error $e_i = x_i -z_i$.

$$\begin{split}
e_{i+1} &= x_{i+1} - z_{i+1}\\
&=Ax_i+Bu_i+w_i-Az_i-Bv_i\\
&=(A+BK)(x_i-z_i) + w_i\\
&=(A+BK)e_i +w_i

\end{split}
$$

$A+BK$ are stable and $w_i$ is bounded (since $w_i\in\mathbb W$), therefore, there is some set $\mathcal E$ that $e$ will stay inside for all time.

![Sample image](imgs/robustmpc2.png "Sample imgs")

Therefore, we can know that once we have a nominal trajectory, the real trajectory is somewhere near the nominal trajectory: $x_i \in z_i \oplus \mathcal E$.

This is because we plan to apply the controller $u_i = K(x_i-z_i)+v_i$.

---

### Conmupte the set $\mathcal E$ that the error will remain inside

To compute the set $\mathcal E$, we want to know the **minimal** robust invariant set.

Consider the system $x^+ = Ax +w, w\in \mathbb W$ and $x_0=0$.

$$
\begin{split}
x_1 &= Ax_0 + w_0 = w_0 \\
x_2 &= Aw_0 + w_1 \\
x_3 &= A(Aw_0 + w_1) +w_2\\
\cdots\\
\therefore x_i& = \sum_{k=0}^{i-1}A^k w_k
\end{split}

$$

The set that contains all possible states $x_i$ is

$$F_i = \bigoplus_{k=0}^{i-1}A^k\mathbb W$$

where $\bigoplus$ is Minkowski sums.

**Algorithm**
![Sample image](imgs/robustmpc3.png "Sample imgs")

:::example
```python
def min_robust_invariant_set(A_cl: np.ndarray, W: Polyhedron, max_iter: int = 30) -> Polyhedron:
	Omega = W
	i =0
	while True:
		A_i = np.linalg.matrix_power(A_cl, i)
		Omega_next = Omega + A_i@W
		Omega_next.minHrep()

		if np.linalg.matrix_norm(A_i, ord=2) < 1e-2:
			break
		if i > max_iter:
			print("Warning: max iterations reached in min_robust_invariant_set")
			break
		Omega = Omega_next
		i+=1
	return Omega
```
:::

### Modify constraints on nominal trajectory

In MPC problem, we originally try to get a trajectory of $x$ which is real state, but here we first get a trajectory of $z$ which is $z = x-e$. 

So far we know the set of $x$ and $z$ as $\mathbb X$ and $\mathcal E$.

We want to ensure $z_i\oplus \mathcal E \subseteq \mathbb X$, which in turns $z_i \in \mathbb X \ominus \mathcal E$.

We also need to consider the set of the inputs $v_i$. We have the controller of $u_i = K(x_i-z_i)+v_i = Ke_i +v_i$.

Therefore, $v_i \in \mathbb U \ominus k\mathcal E$.

### Formulate as convex optimization problem

In the optimization problem, we optimize $\mathbf z$ and $\mathbf v$. 


:::theory

$$
\begin{split}
    &\min_{z_i, v_i } \sum_{i=0}^{N-1}z_i^TQz_i+v_i^TRv_i +z_N^TPz_N\\

    s.t.~~~~~~ &z_{k+1} = Az_k + Bv_k ~~~ \forall k\in [N]\\
    &z_k \in \mathbb X \ominus \mathcal E~~~ \forall k\in [N-1]\\
    &v_k \in \mathbb U \ominus k\mathcal E ~~~ \forall k\in [N-1]\\
    &z_N \in \mathcal X_f \\
    &x_0 \in z_0 \oplus \mathcal E

\end{split}


$$


:::

Once we get the optimum nominal trajectory $\mathbf z$ and the inputs $\mathbf{v}$, we use the  tracking controller $u_i = K(x_i-z_i)+v_i$ for the inputs. 

We can also estimate the state by $x^+ = Ax + Bu + w $.

---

$z_N^TPz_N$: terminal cost. $P$ is gained by solving Roccati Equation. 

Terminal set $\mathcal X_f$: 

$$z^+ = Az +B\kappa_f(z) = (A+BK)z \in \mathcal X_f~~~\forall z\in \mathcal X_f$$

All tightened state and iput constraints are stisfied in $\mathcal X_f$:

$$\mathcal X_f \subseteq \mathbb X \ominus \mathcal E, \kappa_f(z) \in \mathbb U ~~~\forall z \in \mathcal X_f$$

At least the $X_f$ set should satisfy the following constraints:

$$\mathcal X_f \subseteq \mathbb X\ominus \mathcal E =\tilde{\mathbb  X}= \{z|\tilde{\mathbb  X}.A\cdot z\leq\tilde{\mathbb  X}.b\}$$

$$\kappa_f(z) = Kz \in \mathbb U = \{u|\mathbb U.A\cdot u \leq \mathbb U.b\} = \{z|\mathbb U.A\cdot Kz\leq\mathbb U.b\}$$

Therefore, the intersection of two sets will be a starting set for using the maximum invariant set algorithm.

:::example
```python
def max_invariant_set(A_cl, X: Polyhedron, max_iter = 30) -> Polyhedron:
	"""
	Compute invariant set for an autonomous linear time invariant system x^+ = A_cl x
	"""
	O = X
	for i in range(max_iter):
		pre_O = O
		F = O.A
		f = O.b
		O = Polyhedron.from_Hrep(F@A_cl, f).intersect(O)
		O.minHrep(True)
		if O == pre_O:
			break
		pre_O = O

	
	return O



X_and_KU = X.intersect(Polyhedron.from_Hrep(U.A@K, U.b))
Xf = max_invariant_set(A_cl, X_and_KU)


X_tilde_and_KU_tilde = X_tilde.intersect(Polyhedron.from_Hrep(U_tilde.A@K, U_tilde.b))
Xf_tilde = max_invariant_set(A_cl, X_tilde_and_KU_tilde)
```
:::


