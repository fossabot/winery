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
import {ToscaTypes} from './enums';

export interface SectionResolverData {
    section: ToscaTypes;
    namespace: string;
    path: string;
    xsdSchemaType: string;
}

export interface InstanceResolverData extends SectionResolverData {
    localName: string;
}

export interface PropertiesDefinitionResolverData {
    propertiesSelected: boolean;
    wrappingSelected: boolean;
}
