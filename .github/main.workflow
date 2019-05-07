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

################################################
# Workflow for a NPM release when a tag is
# pushed
################################################
workflow "npm release" {
  resolves = [
    "release.npm.publish",
    "release.lint",
  ]
  on = "push"
}

action "release.filter" {
  uses = "actions/bin/filter@master"
  args = "tag v*"
}

action "release.install" {
  uses = "docker://node:10"
  needs = ["release.filter"]
  args = "yarn install"
}

action "release.build" {
  uses = "docker://node:10"
  needs = ["release.install"]
  args = "yarn run build"
}

action "release.lint" {
  uses = "docker://node:10"
  needs = ["release.install"]
  args = "yarn run lint"
}

action "release.test" {
  uses = "docker://node:10"
  needs = ["release.build"]
  args = "yarn run test"
}

action "release.auth" {
  needs = ["release.test"]
  uses = "actions/bin/filter@master"
  args = ["actor", "maximdevoir"]
}

action "release.npm.publish" {
  needs = ["release.auth"]
  uses = "actions/npm@master"
  args = "publish --access public"
  secrets = [
    "ENUM_BUG_AUTH_TOKEN",
  ]
}
