# Motivation, Scope

We regard **benchmarking** as a gateway towards inter-organizational data
sharing. It provides immediate value and requires only small effort on the
data collection side.

With appropriate encryption technology in place, it is also a great show case
for SINE ideas around data sharing and collaboration that maximes souveranity
for the parties involved.

## Project Vision

- To make benchmarking, secured through Secure Multi-Party Computation (S-MPC),
  available to as many people as possible
- To make benchmarking fun to use
- To faciliate "benchmarking parties" where like-minded organizations and
  people meet in an adhoc fashion and perform benchmarking through our software
- To act as a SINE ambassador: to motivate organizations and people to
  dive deeper into the topic of collaboration and data sharing

## High-Level Product Description and Roadmap

Collaborative benchmarking consists of 2 key components

1. **context** in which **people** are coming together with a **common goal**
2. **KV data**: people entering data that can be benchmarked; which usually means the provided data
   is structured as follows:
   - compared are `key, value` tuples
   - the keys are user-defined
   - the provided value is context-specific

### Implementation Details

We propose

- As much as possible happens in the browser, so that it can run
  everywhere and can also be visualized.
- The JS library (JIFF)[https://github.com/multiparty/jiff/] is used to perform secure multi-party computation
- We have a React / Next.js frontend glueing it all together

### Version 1: Static, 3 person data room

As a benchmarking service user, you can go to a website and compare your
data with 2 other people; that is

- you can open a webpage
- enter a private integer value
- wait for other 2 parties to do the same
- and after every other party has entered and commited their value, each
  party can see how she/he ranks among the others.

#### Example

To give an example: parties want to compare advertising expenditure.
Each party enters how much of a customer lifetime value is spent on
advertising in percent

- party A: 10
- party B: 13
- party C: 12

After entering these values, the parties could see as a result

- party A: rank 1
- party B: rank 3
- party C: rank 2

### Version 2: Data Room Creation

With Version 2, we give the service "adhoc" capabilities, meaning

As an interested party,

- I can create my own ad hoc data room which gets a unique URL
  through which I can invite fellows to it
- I can run benchmarking in the same 3 person scenario as with
  version 1 there

### Version 3: More Participants

With Version 3, we extend the size of "adhoc" data rooms, meaning

As an interested party,

- while I create a new data room, I can also specify how many (`n`) fellows
  I expect to participate in the process
- each of the `n` fellows gets its benchmarking result as before (ranking from `1..n`)

### Version 4: Data Keys

Up to version 3, only 1 `key, value` pair was used per party implicitly.
With version 4, we are changing this...

As an interested party

- while I create a new data room,
  - I can also specify how many `key, value` pairs I want to benchmark myself
    against others
  - and upon selecting this, I can give each key a proper name such that
    everyone is comparing apples with apples
- after doing creating such a room, each fellow
  - sees a list of `keys` and can enter a value for each `key`
  - and can then submit this list once it is completed

### Version 5: More Stats :p

With Version 5, we enable richer stats for each data room, meaning

As an interested party

- while I create a new data room, I must select which statistics to perform
- with available statistics
  - `ranking` (that's previous versions)
  - `quantile` (50%, 25% or 10%; i.e. in which quantile am I – 
    lowest starting with 1)
  - `min`, `max`, `median`; meaning, every party can see the minimum,
    maximum, and median value
- and after each party has entered its value, it can see the results

## TODOs / Discussion Points

- [ ] Can we maybe use bluetooth instead of regular WIFI / cellular
      for the data exchange among peers? (in order to demo the difference
      in data sharing our sw makes)
- [ ] Can we somehow visualize the S-MPC algorithms such that the SW is
      less of a black box?
- [ ] Derived from the vision statements, we propose to use
      [JIFF](https://github.com/multiparty/jiff/) for S-MPC.
- [ ] Frontend JS / TS Framework to use
- [ ] Main Frontend language to use (Typescript?)

# Resources

[1] Link Collection w/ OpenSource S-MPC projects: https://github.com/rdragos/awesome-mpc

[2] SINE e.V. website https://sine.foundation/ :)
