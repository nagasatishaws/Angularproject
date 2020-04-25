import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ae-sig-narratives',
  templateUrl: './ae-sig-narratives.component.html',
  styleUrls: ['./ae-sig-narratives.component.scss']
})
export class AeSigNarrativesComponent implements OnInit {
  public narrativeList: any = ["1. CAS-2020-01-1140", "2. CAS-2020-01-1214", "3. CAS-2020-01-1211",
    "4. CAS-2020-02-1131", "5. CAS-2020-02-2121", "6. CAS-2020-02-1312"];

  public narrSexData: any = [
    {
      data: [4, 5, 1],
      label: "Gender"
    }
  ];
  public narrSexLabels: any = ["Male", "Female", "Not Mentioned"];
  public narrAgeData: any = [
    {
      data: [6, 8],
      label: "Gender"
    }
  ];
  public narrAgeLabels: any = ["35-45 years", "N/A"];
  public narrContextData: any = [
    {
      data: [4, 5, 6, 5, 3],
      label: "AI Context sense"
    }
  ]
  public narrContextLabels: any = ["Cut Paracetamol in Half", "No Concomitant Medication", "Oral (Dosage Form)",
    "Paracetamol Difficult to Swallow", "Incorrect Dose Administered"];
  constructor() { }

  ngOnInit() {
  }

}
