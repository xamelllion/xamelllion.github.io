
n = 7711111236789876
print(n)
i = 2
a = []
while i < n:
    if n%i==0:
        a.append(i)
        n //= i
    else:
        i+=1

if n != 0:
    a.append(n)
print(a)
