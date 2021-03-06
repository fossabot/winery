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
import {Headers, Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {backendBaseURL} from '../../../configuration';
import {InstanceService} from '../../instance.service';
import {InheritanceApiData} from './inheritanceApiData';
import {SelectData} from '../../../wineryInterfaces/selectData';

@Injectable()
export class InheritanceService {

    private path: string;

    constructor(private http: Http,
                private sharedData: InstanceService) {
        this.path = this.sharedData.path;
    }

    getInheritanceData(): Observable<InheritanceApiData> {
        const headers = new Headers({'Accept': 'application/json'});
        const options = new RequestOptions({headers: headers});

        return this.http.get(backendBaseURL + this.path + '/inheritance/', options)
            .map(res => res.json());
    }

    getAvailableSuperClasses(): Observable<SelectData[]> {
        const headers = new Headers({'Accept': 'application/json'});
        const options = new RequestOptions({headers: headers});

        return this.http.get(backendBaseURL + '/' + this.path.split('/')[1] + '?grouped=angularSelect/', options)
            .map(res => res.json());
    }

    saveInheritanceFromString(url: string, inheritFrom: string): Observable<any> {
        const inheritanceData = new InheritanceApiData();
        inheritanceData.isAbstract = 'no';
        inheritanceData.isFinal = 'no';
        inheritanceData.derivedFrom = inheritFrom;

        this.path = url;

        return this.saveInheritanceData(inheritanceData);
    }

    saveInheritanceData(inheritanceData: InheritanceApiData): Observable<any> {
        const headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
        const options = new RequestOptions({headers: headers});

        // create a copy to not send unnecessary data to the server
        const copy = new InheritanceApiData();
        copy.derivedFrom = inheritanceData.derivedFrom;
        copy.isAbstract = inheritanceData.isAbstract;
        copy.isFinal = inheritanceData.isFinal;

        return this.http.put(backendBaseURL + this.path + '/inheritance/', JSON.stringify(copy), options);
    }
}
