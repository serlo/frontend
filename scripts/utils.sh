#!/bin/bash

BOLD=$(tput bold)
NORMAL=$(tput sgr0)

function error() {
  log "Error: $@"
  exit 1
}

function print_header() {
  echo
  log "=== $@ ==="
}

function log() {
  echo "${BOLD}$@${NORMAL}"
}
