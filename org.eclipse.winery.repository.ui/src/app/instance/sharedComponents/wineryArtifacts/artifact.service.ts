/*******************************************************************************
 * Copyright (c) 2017 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the Apache Software License 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *******************************************************************************/
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Router} from '@angular/router';
import {backendBaseURL} from '../../../configuration';
import {Observable} from 'rxjs';
import {GenerateArtifactApiData} from '../interfaces/generateArtifactApiData';
import {InterfacesApiData} from '../interfaces/interfacesApiData';
import {NameAndQNameApiData} from '../../../wineryQNameSelector/wineryNameAndQNameApiData';
import {ArtifactApiData} from '../../../wineryInterfaces/wineryComponent';

@Injectable()
export class WineryArtifactService {

    constructor(private http: Http,
                private route: Router) {
    }

    getAllArtifacts(): Observable<ArtifactApiData[]> {
        return this.sendJsonRequest(this.route.url);
    }

    /**
     * Deletes an artifact
     *
     * @returns {Observable<Response>}
     */
    deleteArtifact(artifactName: string): Observable<Response> {
        const headers = new Headers({'Accept': 'application/json'});
        const options = new RequestOptions({headers: headers});

        return this.http.delete(backendBaseURL + this.route.url + '/' + artifactName + '/', options);
    }

    createNewArtifact(artifact: GenerateArtifactApiData): Observable<Response> {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});

        return this.http.post(backendBaseURL + this.route.url + '/', artifact, options);

    }

    getInterfacesOfAssociatedType(): Observable<InterfacesApiData[]> {
        return this.sendJsonRequest(this.route.url + '/interfaces/');
    }

    getAllArtifactTypes(): Observable<NameAndQNameApiData[]> {
        return this.sendJsonRequest('/artifacttypes');
    }

    getAllArtifactTemplates(): Observable<NameAndQNameApiData[]> {
        return this.sendJsonRequest('/artifacttemplates');
    }

    /**
     * Private method for DRY principle. It is used to get all kinds of data
     * for the specified sub path.
     *
     * @param requestPath string The path which is specific for each request.
     * @returns {Observable<any>}
     */
    private sendJsonRequest(requestPath: string = ''): Observable<any> {
        const headers = new Headers({'Accept': 'application/json'});
        const options = new RequestOptions({headers: headers});
        return this.http.get(backendBaseURL + requestPath, options)
            .map(res => res.json());
    }
}
