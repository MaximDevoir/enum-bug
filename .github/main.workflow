################################################
# Workflow for a branch push
################################################
workflow "build and test on branch" {
  resolves = [
    "branch.lint.node.10",
    "branch.test.node.10",
    "branch.test.node.8",
    # "branch.test.node.12"
  ]
  on = "push"
}

# node 10
action "branch.filter" {
  uses = "actions/bin/filter@master"
  args = "branch"
}

action "branch.install.node.10" {
  needs = ["branch.filter"]
  uses = "docker://node:10"
  args = "yarn install"
}

action "branch.build.node.10" {
  uses = "docker://node:10"
  needs = ["branch.install.node.10"]
  args = "yarn run build"
}

action "branch.lint.node.10" {
  uses = "docker://node:10"
  needs = ["branch.install.node.10"]
  args = "yarn run lint"
}

action "branch.test.node.10" {
  uses = "docker://node:10"
  needs = ["branch.build.node.10"]
  args = "yarn run test"
}

# node 8
action "branch.install.node.8" {
  needs = ["branch.filter"]
  uses = "docker://node:8"
  args = "yarn install"
}

action "branch.build.node.8" {
  uses = "docker://node:8"
  needs = ["branch.install.node.8"]
  args = "yarn run build"
}

action "branch.test.node.8" {
  uses = "docker://node:8"
  needs = ["branch.build.node.8"]
  args = "yarn run test"
}
