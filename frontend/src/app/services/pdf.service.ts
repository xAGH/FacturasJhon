import { Injectable } from '@angular/core';
import { PDF } from '../interfaces/pdf';
import * as html2pdf from 'html2pdf.js'
import { environment } from 'src/environments/environment';
import { HttpClientService } from './http-client.service';
import { map, Observable } from 'rxjs';

type Response = {
  response: PDF
}

@Injectable({
  providedIn: 'root'
})
export class PDFService {

  constructor(private _client: HttpClientService) {}
  
  generate(data: PDF) {
    let url = environment.apiUrl + environment.createDocumentEndpoint;
    return this._client.post<Response>(url, data).pipe(
      map((res: Response) => res.response)
    ).subscribe(
      {
        next: ((res: PDF) => {
          res.doc_type = data.doc_type == 'invoice' ? 'Factura' : 'Presupuesto';
          this._generatePDF(res);
        })
      }
    )
  }

  private _generatePDF(data: PDF){
    data.date = this._formatDate(data.date);
    data.expiration_date = this._formatDate(data.expiration_date);
    let element = this._generateHtml(data);
    const options = {
      filename: data.invoice_no ? data.invoice_no : data.budget_no,
      html2canvas: { scale: 2 },
      margin: 1
    };
    html2pdf().set(options).from(element).save();
  }

  private _formatDate(date: string): string{
    return date.match(/\d{2}-\d{2}-\d{4}/) ? date : date.split('-').reverse().join('-');
  }

  private _generateHtml(data: PDF): string{
    let works = "";
    data.works.forEach(work => {
      works += `
      <tr style="text-align: right; border-bottom-width: 1px; ">
        <th scope="row"
            style="padding-top: 1rem;padding-bottom: 1rem; padding-left: 1.5rem;padding-right: 1.5rem; color: #111827; text-align: left; ">
            ${work.concept}</th>
        <td style="padding-top: 1rem;padding-bottom: 1rem; padding-left: 1.5rem;padding-right: 1.5rem; ">€
            ${work.price}</td>
        <td style="padding-top: 1rem;padding-bottom: 1rem; padding-left: 1.5rem;padding-right: 1.5rem; ">
            ${work.quantity}</td>
        <td style="padding-top: 1rem;padding-bottom: 1rem; padding-left: 1.5rem;padding-right: 1.5rem; ">€
            ${work.total}</td>
      </tr>
      `
    })
    return  `
    <style>
    tr:nth-child(even) {
        background-color: #F3F4F6;
    }
    </style>
    <div
        style="display: grid; padding-left: 2.5rem;padding-right: 2.5rem; width: 100%; height: 100vh; grid-template-rows: repeat(4, minmax(0, 1fr)); gap: 0.25rem;">
        <div style="display: flex; justify-content: space-between; ">
            <div style="display: flex; align-items: center; "><img style="padding-right: 2rem; width: 170px;" src="../../assets/icon.png" alt="icon">
                <div style="display: flex; flex-direction: column;">
                    <p style="font-size: 0.875rem;line-height: 1.25rem;color: #000; opacity: 0.6;">Jhon Eider Giraldo Tobón
                    </p>
                    <p style="font-size: 0.875rem;line-height: 1.25rem;color: #000; opacity: 0.6;">NIF/CIF 04762353L</p>
                    <p style="font-size: 0.875rem;line-height: 1.25rem;color: #000; opacity: 0.6;">Calle la florida 11 1A</p>
                    <p style="font-size: 0.875rem;line-height: 1.25rem;color: #000; opacity: 0.6;">48902 Barakaldo</p>
                    <p style="font-size: 0.875rem;line-height: 1.25rem;color: #000; opacity: 0.6;">+34 674535140</p>
                    <p style="font-size: 0.875rem;line-height: 1.25rem;color: #000; opacity: 0.6;">michaelgiraldo0509@hotmail.com</p>
                </div>
            </div>
            <p style="font-size: 1.875rem;line-height: 2.25rem; text-align: right; align-self: center; text-transform: uppercase;">${data.doc_type}</p>
        </div>
        <div style="display: flex; justify-content: space-between; ">
            <div style="display: flex; flex-direction: column; justify-content: center; ">
                <p style="font-size: 1.25rem;line-height: 1.75rem; "><span style="text-transform:capitalize;">${data.doc_type}</span> a:</p>
                <p style="color: #000; opacity: 0.6;">${data.client_name}</p>
                <p style="color: #000; opacity: 0.6;">NIF/CIF ${data.client_document}</p>
                <p style="color: #000; opacity: 0.6;">${data.client_address}</p>
                <p style="color: #000; opacity: 0.6;">+34 ${data.client_phone}</p>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: center; gap: 0.5rem; ">
                <div style="display: flex; justify-content: space-between; gap: 5rem; ">
                    <p>Número de <span style="text-transform:lowercase;">${data.doc_type}</span>:</p>
                    <p style="color: #000; opacity: 0.6;">${data.invoice_no ? data.invoice_no : data.budget_no}</p>
                </div>
                <div style="display: flex; justify-content: space-between; gap: 5rem;">
                    <p>Fecha de generacion:</p>
                    <p style="color: #000; opacity: 0.6;">${data.date}</p>
                </div>
                <div style="display: flex; justify-content: space-between; gap: 5rem;">
                    <p>Vencimiento:</p>
                    <p style="color: #000; opacity: 0.6;">${data.expiration_date == data.date ? 'Vence al recibir' : data.expiration_date}</p>
                </div>
            </div>
        </div>
        <div style="grid-row: span 2 / span 2; ">
            <table
                style="color: #6B7280; font-size: 0.875rem;line-height: 1.25rem; text-align: left; width: 100%; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); ">
                <thead style="background-color: #F9FAFB; color: #374151; text-transform: uppercase; ">
                    <tr style="font-size: 1rem;line-height: 1.5rem; text-align: right; ">
                        <th scope="col"
                            style="padding-top: 0.75rem;padding-bottom: 0.75rem; padding-left: 1.5rem;padding-right: 1.5rem; text-align: left; ">
                            Concepto</th>
                        <th scope="col"
                            style="padding-top: 0.75rem;padding-bottom: 0.75rem; padding-left: 1.5rem;padding-right: 1.5rem; ">
                            Precio</th>
                        <th scope="col"
                            style="padding-top: 0.75rem;padding-bottom: 0.75rem; padding-left: 1.5rem;padding-right: 1.5rem; ">
                            Cantidad</th>
                        <th scope="col"
                            style="padding-top: 0.75rem;padding-bottom: 0.75rem; padding-left: 1.5rem;padding-right: 1.5rem; ">
                            Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${works}
                    <tr style="text-align: right; border-bottom-width: 1px; ">
                        <th></th>
                        <td></td>
                        <th style="padding-top: 1rem;padding-bottom: 1rem; padding-left: 1.5rem;padding-right: 1.5rem; ">
                            Subtotal</th>
                        <td style="padding-top: 1rem;padding-bottom: 1rem; padding-left: 1.5rem;padding-right: 1.5rem; ">€
                            ${data.raw_payment}</td>
                    </tr>
                    <tr style="text-align: right; border-bottom-width: 1px; ">
                        <td></td>
                        <td></td>
                        <th style="padding-top: 1rem;padding-bottom: 1rem; padding-left: 1.5rem;padding-right: 1.5rem; ">IVA
                            (21%)</th>
                        <td style="padding-top: 1rem;padding-bottom: 1rem; padding-left: 1.5rem;padding-right: 1.5rem; ">€
                            ${data.iva}</td>
                    </tr>
                    <tr style="text-align: right; border-bottom-width: 1px; ">
                        <td></td>
                        <td></td>
                        <th
                            style="padding-top: 1rem;padding-bottom: 1rem; padding-left: 1.5rem;padding-right: 1.5rem; color: #111827; font-size: 1.125rem;line-height: 1.75rem; ">
                            Total
                        <td
                            style="padding-top: 1rem;padding-bottom: 1rem; padding-left: 1.5rem;padding-right: 1.5rem; color: #111827; font-size: 1.125rem;line-height: 1.75rem; ">
                            € ${data.total}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `
  }

}
