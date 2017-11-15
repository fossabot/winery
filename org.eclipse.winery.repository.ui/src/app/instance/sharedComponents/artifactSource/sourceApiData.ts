/**
 * Copyright (c) 2017 University of Stuttgart.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * and the Apache License 2.0 which both accompany this distribution,
 * and are available at http://www.eclipse.org/legal/epl-v20.html
 * and http://www.apache.org/licenses/LICENSE-2.0
 */

export class SourceApiData {
    private fileName = '';
    private content = '';
    private subDirectory = '';

    constructor() {
    }

    public getSubDirectory(): string {
        return this.subDirectory;
    }

    public setSubDirectory(value: string) {
        this.subDirectory = value;
    }

    public getFileName(): string {
        return this.fileName;
    }

    public getContent(): string {
        return this.content;
    }

    public setFileName(fileName: string) {
        this.fileName = fileName;
    }

    public setContent(content: string) {
        this.content = content;
    }

}