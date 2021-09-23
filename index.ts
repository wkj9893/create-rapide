#!/usr/bin/env node
import fs = require('fs')
import path = require('path')
import prompts = require('prompts')
import { lightBlue, lightGreen, lightYellow } from './utils/color'

const cwd = process.cwd()
const argv = process.argv.slice(2)
const targetDir = argv[0]
const userAgent = process.env.npm_config_user_agent
const isYarn = userAgent && userAgent.startsWith('yarn')
const isPnpm = userAgent && userAgent.startsWith('pnpm')

async function main() {
  const projectName =
    targetDir ??
    (
      await prompts({
        type: 'text',
        name: 'name',
        message: 'Project name',
        initial: 'rapide-project'
      })
    ).name
  const projectPath = path.resolve(cwd, projectName)
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true })
  }
  if (fs.readdirSync(projectPath).length > 0) {
    const { confirm } = await prompts({
      type: 'confirm',
      name: 'confirm',
      message: `The target directory ${projectPath} is not empty. Remove existing files and continue?`
    })
    if (!confirm) {
      return
    }
    fs.rmSync(projectPath, { recursive: true, force: true })
  }
  fs.mkdirSync(projectPath, { recursive: true })
  const { framework } = await prompts({
    type: 'select',
    name: 'framework',
    message: 'Pick a framework',
    choices: [
      {
        title: lightYellow('vanilla'),
        value: 'vanilla'
      },
      {
        title: lightBlue('react'),
        value: 'react'
      }
    ]
  })

  const { language } = await prompts({
    type: 'select',
    name: 'language',
    message: 'Pick a language',
    choices: [
      {
        title: lightYellow('js'),
        value: 'js'
      },
      {
        title: lightBlue(`ts`),
        value: 'ts'
      }
    ]
  })

  const template = language === 'js' ? framework : `${framework}-ts`

  copy(path.resolve(__dirname, 'templates', template), projectPath)

  console.log(`\n${lightGreen('ok')}  Now run:\n`)
  if (projectPath !== cwd) {
    console.log(`cd ${path.relative(cwd, projectPath)}`)
  }

  if (isPnpm) {
    console.log('pnpm install')
    console.log('pnpm dev')
  } else if (isYarn) {
    console.log('yarn')
    console.log('yarn dev')
  } else {
    console.log('npm install')
    console.log('npm run dev')
  }
  console.log()
}

main().catch((e) => {
  console.error(e)
})

function copy(src: string, dest: string) {
  if (fs.statSync(src).isFile()) {
    fs.copyFileSync(src, dest)
    return
  } else {
    fs.mkdirSync(dest, { recursive: true })
    for (const file of fs.readdirSync(src)) {
      copy(path.resolve(src, file), path.resolve(dest, file))
    }
  }
}
