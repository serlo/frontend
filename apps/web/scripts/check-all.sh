#!/bin/bash

source scripts/utils.sh

function init() {
  set -e

  read_arguments "$@"

  print_header "Make sure packages are up to date"
  yarn install --immutable

  print_header "Make sure generated types are up to date"
  yarn codegen
}

function read_arguments() {
  if [ -n "$1" ]; then
    if [ "$1" = "--no-uncommitted-changes" ]; then
      NO_UNCOMMITTED_CHANGES="True"
    else
      error "Unknown parameter provided"
    fi
  fi
}

function main() {
  if [ -n "$NO_UNCOMMITTED_CHANGES" ]; then
    print_header "Check that there are no uncommitted changes when pushing"
    test_no_uncommitted_changes_when_pushing
  fi

  print_header "Run linter"
  yarn lint

  print_header "Run all tests"
  yarn test
}

function test_no_uncommitted_changes_when_pushing() {
  if [ -n "$(git diff HEAD)" ]; then
    error "There are uncommitted changes in your workspace (forgot to commit changes of 'yarn codegen'?!)"
  fi
}

init "$@"
main
