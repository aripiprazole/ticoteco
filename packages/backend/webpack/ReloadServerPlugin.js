/*
 * TikTok clone as web application
 * Copyright (C) 2022  Gabrielle Guimarães de Oliveira
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const cluster = require('cluster');
const path = require('path');

const defaultOptions = {script: 'server.js'};

class ReloadServerPlugin {
  constructor(options = defaultOptions) {
    this.done = null;
    this.workers = [];

    cluster.setupMaster({
      exec: path.resolve(process.cwd(), options.script),
    });

    cluster.on('online', (worker) => {
      this.workers.push(worker);

      if (this.done) {
        this.done();
      }
    });
  }

  apply(compiler) {
    const options = {name: 'reload-server'};

    compiler.hooks.afterEmit.tap(options, (_, callback) => {
      this.done = callback;

      this.workers.forEach((worker) => {
        try {
          process.kill(worker.process.pid, 'SIGTERM');
        } catch (error) {
          console.warn(`Unable to kill process #${worker.process.pid}`);
        }
      });

      this.workers = [];
      cluster.fork();
    });
  }
}

module.exports = ReloadServerPlugin;
