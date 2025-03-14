'use strict';

import { lambdaHandler } from '../../app.mjs';
import { expect } from 'chai';

const event = {
    "Records": [
        {
            "messageId": "1",
            "receiptHandle": "AQEBwJnKyrHigUMZj6rYigCgxlaS3SLy0a...",
            "body": JSON.stringify({
                "Message": JSON.stringify({
                    "companyName": "DMA DISTRIBUIDORA S/A",
                    "cnpj": "01.928.075/0078-89",
                    "stateRegistration": "062678368.60-18",
                    "address": {
                        "street": "AV. MIGUEL PERRELA",
                        "number": "000987",
                        "neighborhood": "CASTELO",
                        "zipCode": "31330-290",
                        "city": "BELO HORIZONTE",
                        "state": "MG",
                        "lat": "-19.87811",
                        "lng": "-43.99649"
                    },
                    "products": [
                        {
                            "name": "BANANA PRATA ESP. kg",
                            "product": "BANANAPRATAESP. kg",
                            "code": "32787",
                            "quantity": 0.495,
                            "unit": "kg",
                            "price": 2.96
                        },
                        {
                            "name": "BANANA PRATA ESP. kg",
                            "product": "OVOS BCO.IANA",
                            "code": "93624",
                            "quantity": 1,
                            "unit": "UN",
                            "price": 9.98
                        },
                        {
                            "name": "BANANA PRATA ESP. kg",
                            "product": "LIMAOTHAITIESP. kg",
                            "code": "32844",
                            "quantity": 0.65,
                            "unit": "kg",
                            "price": 1.94
                        },
                        {
                            "name": "BANANA PRATA ESP. kg",
                            "product": "BAT.INGLESA ESP.kg",
                            "code": "33176",
                            "quantity": 1.075,
                            "unit": "kg",
                            "price": 6.43
                        },
                        {
                            "name": "BANANA PRATA ESP. kg",
                            "product": "TOMATE ANDREA kg",
                            "code": "37163",
                            "quantity": 0.705,
                            "unit": "kg",
                            "price": 6.33
                        },
                        {
                            "name": "BANANA PRATA ESP. kg",
                            "product": "CENOURAVERM.ESP.kg",
                            "code": "33195",
                            "quantity": 0.285,
                            "unit": "kg",
                            "price": 2.56
                        },
                        {
                            "name": "BANANA PRATA ESP. kg",
                            "product": "ALF.CR.FOLHOSA UN",
                            "code": "88702",
                            "quantity": 1,
                            "unit": "UN",
                            "price": 3.98
                        },
                        {
                            "name": "BANANA PRATA ESP. kg",
                            "product": "CEBOLAROXAESP. kg",
                            "code": "33439",
                            "quantity": 0.665,
                            "unit": "kg",
                            "price": 11.29
                        },
                        {
                            "name": "BANANA PRATA ESP. kg",
                            "product": "CEBOLAAMAR.ESP kg",
                            "code": "33434",
                            "quantity": 0.155,
                            "unit": "kg",
                            "price": 1.55
                        },
                        {
                            "name": "BANANA PRATA ESP. kg",
                            "product": "MAMAO HAVAI ESP.KG",
                            "code": "32864",
                            "quantity": 0.89,
                            "unit": "kg",
                            "price": 17.78
                        },
                        {
                            "name": "BANANA PRATA ESP. kg",
                            "product": "LOM.SUI.RES.FAT.kg",
                            "code": "30232",
                            "quantity": 0.422,
                            "unit": "kg",
                            "price": 11.31
                        },
                        {
                            "name": "BANANA PRATA ESP. kg",
                            "product": "LOM.SUI.RES.FAT.kg",
                            "code": "30232",
                            "quantity": 0.43,
                            "unit": "kg",
                            "price": 11.52
                        },
                        {
                            "name": "BANANA PRATA ESP. kg",
                            "product": "FILE P.FGO.AVI.1KG",
                            "code": "102575",
                            "quantity": 2,
                            "unit": "UN",
                            "price": 33.6
                        },
                        {
                            "name": "BANANA PRATA ESP. kg",
                            "product": "MANGA PALMER ES.kg",
                            "code": "32874",
                            "quantity": 0.745,
                            "unit": "kg",
                            "price": 5.57
                        },
                        {
                            "name": "BANANA PRATA ESP. kg",
                            "product": "PATINHO BOV.BIFE K",
                            "code": "46312",
                            "quantity": 1.176,
                            "unit": "kg",
                            "price": 46.8
                        },
                        {
                            "name": "BANANA PRATA ESP. kg",
                            "product": "LIN.TP.CAL.TR.400G",
                            "code": "154904",
                            "quantity": 1,
                            "unit": "PT",
                            "price": 13.8
                        },
                        {
                            "name": "BANANA PRATA ESP. kg",
                            "product": "FIL.TIL.B.FRE.800G",
                            "code": "103252",
                            "quantity": 1,
                            "unit": "PT",
                            "price": 47.8
                        }
                    ],
                    "additionalInformation": {
                        "totalItems": 17,
                        "totalValue": 235.2,
                        "valuePaid": 235.2,
                        "paymentMethod": "04 - Cartão de Débito",
                        "accessKey": "31-24/05-01.928.075/0078-89-65-009-000.228.934-151.210.8756",
                        "otherInformation": "20240502007800900592670",
                        "date": "2024-07-08T01:12:00.898Z"
                    }
                })
            }),
            "attributes": {
                "ApproximateReceiveCount": "1",
                "SentTimestamp": "1594840000000",
                "SenderId": "AIDAIENQZJOLO23YVJ4VO",
                "ApproximateFirstReceiveTimestamp": "1594840000001"
            },
            "messageAttributes": {
                "AttributeOne": {
                    "stringValue": "Attribute Value",
                    "stringListValues": [],
                    "binaryListValues": [],
                    "dataType": "String"
                }
            },
            "md5OfBody": "7b270e59b47ff90a553787216d55d91d",
            "eventSource": "aws:sqs",
            "eventSourceARN": "arn:aws:sqs:us-east-1:982286361702:MidasSaveDataSQS.fifo",
            "awsRegion": "us-east-1"
        }
    ]
};

describe('Tests index', function () {
    it('verifies successful response', async () => {
        const result = await lambdaHandler(event);
        console.log(result);

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        const response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        expect(response.message).to.be.equal("hello world");
    });
});
