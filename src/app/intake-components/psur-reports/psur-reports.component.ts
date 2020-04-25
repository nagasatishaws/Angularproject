import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-psur-reports',
  templateUrl: './psur-reports.component.html',
  styleUrls: ['./psur-reports.component.scss']
})
export class PsurReportsComponent implements OnInit {
  public dateOfAuth: string = "2007-12-12";
  public indications: string = "Benign Prostatic Hyperplasia, Renal Impairment, Hepatic Impairment.";
  public authDosesAndLoc: string = "https://reference.medscape.com/drug/rapaflo-silodosin-999100 include Dosage Forms & Strengths, Benign Prostatic Hyperplasia, Renal Impairment, Hepatic Impairment.";
  // By Age graph data
  public byAgeOngoingData: any = [
    {
      data: [2, 5, 3, 10, 1],
      label: "Ongoing"
    },
    {
      data: [1, 8, 12, 9, 4],
      label: "Completed"
    }
  ]
  public byAgeOngoingLabels: any = ["0-10", "10-25", "25-40", "40-60", ">60"];
  public byAgeCompletedData: any = [
    {
      data: [1, 8, 12, 9],
      label: "Completed"
    }
  ]
  public byAgeCompletedLabels: any = [10, 15, 20, 25];

  // By Sex graph data
  public bySexOngoingData: any = [
    {
      data: [14, 17],
      label: "Ongoing"
    },
    {
      data: [20, 27],
      label: "Completed"
    }
  ]
  public bySexOngoingLabels: any = ["M", "F"];
  public bySexCompletedData: any = [
    {
      data: [20, 27],
      label: "Completed"
    }
  ]
  public bySexCompletedLabels: any = ["M", "F"];

  // By Ethnicity graph data
  public byEthnicityOngoingData: any = [
    {
      data: [14, 17, 5, 20, 9],
      label: "Ongoing"
    },
    {
      data: [20, 27, 7, 10, 15],
      label: "Completed"
    }
  ]
  public byEthnicityOngoingLabels: any = ["Asian", "American Indian", "Black/ African American", "White", "Others"];
  public byEthnicityCompletedData: any = [
    {
      data: [20, 27, 7, 10, 15],
      label: "Completed"
    }
  ]
  public byEthnicityCompletedLabels: any = ["Asian", "American Indian", "Black/ African American", "White", "Others"];

  // Doses in clinical trials data
  public dosesInCTData: any = [
    {
      data: [2, 4, 9, 7],
      label: "Sites"
    }
  ];
  public dosesInCTLabels: any = ["Taipei, Taiwan", "Dhaka, Bangladesh", "Seoul, Korea", "Milan, Italy"];

  // Route Administration
  public routeAdminData: any = [
    {
      data: [15, 20, 18, 35],
      label: "Administration route"
    }
  ];
  public routeAdminLabels: any = ["Tablet", "Patch", "Cream", "Intravenuous"];

  // Patient Population
  public patientPopulationData: any = [
    {
      data: [12, 15, 20, 30],
      label: "Patient Population"
    }
  ];
  public patientPopulationLabels: any = ["Minimal Care", "Moderate Care", "Maximum Care", "Intensive Care"];

  // Special population
  public specialPopulationData: any = [
    {
      data: [47, 15, 19],
      label: "Special Population"
    }
  ];
  public specialPopulationLabels: any = ["Normal Population", "Pregnant Women", "Cardiac Impairments"];

  // Indication vs Exposure
  public indiExpoData: any = [
    {
      data: [2, 4, 3],
      label: "Indication"
    }
  ];
  public indiExpoLabels: any = ["Benign Prostatic Hyperplasia", "Renal Impairment", "Hepatic Impairment"];

  // Post Authorization Exposure - By Age
  public paeByAgeData: any = [
    {
      data: [2, 4, 3, 5, 7],
      label: "Dis-proportionality threshold 0.25"
    },
    {
      data: [4, 6, 3, 10, 2],
      label: "Dis-proportionality RoR 0.31"
    },
    {
      data: [0, 9, 2, 7, 0],
      label: "Pregnant Women"
    },
    {
      data: [2, 4, 5, 6, 10],
      label: "Cardiac Impairment"
    },
  ];
  public paeByAgeLabels: any = ["0-10", "10-25", "25-40", "40-60", ">60"];

  // Post Authorization Exposure - By Sex
  public paeBySexData: any = [
    {
      data: [2, 4],
      label: "Dis-proportionality threshold 0.25"
    },
    {
      data: [4, 6],
      label: "Dis-proportionality RoR 0.31"
    },
    {
      data: [0, 9],
      label: "Pregnant Women"
    },
    {
      data: [2, 4],
      label: "Cardiac Impairment"
    },
  ];
  public paeBySexLabels: any = ["M", "F"];

  // Post Authorization Exposure - By Dose
  public paeByDoseData: any = [
    {
      data: [2, 4],
      label: "Dis-proportionality threshold 0.25"
    },
    {
      data: [4, 6],
      label: "Dis-proportionality RoR 0.31"
    },
    {
      data: [3, 9],
      label: "Pregnant Women"
    },
    {
      data: [2, 4],
      label: "Cardiac Impairment"
    },
  ];
  public paeByDoseLabels: any = ["2mg", "4mg"];

  // Post Authorization Exposure - By Indication
  public paeByIndicationData: any = [
    {
      data: [2, 4, 3, 5],
      label: "Dis-proportionality threshold 0.25"
    },
    {
      data: [4, 6, 3, 10],
      label: "Dis-proportionality RoR 0.31"
    },
    {
      data: [3, 9, 2, 7],
      label: "Pregnant Women"
    },
    {
      data: [2, 4, 5, 6],
      label: "Cardiac Impairment"
    },
  ];
  public paeByIndicationLabels: any = ["Benign Prostatic Hyperplasia", "Renal Impairment", "Hepatic Impairment", "postoperative pain"];

  // Post Authorization Exposure - By Formulation
  public paeByFormulationData: any = [
    {
      data: [2, 4, 3, 5, 9],
      label: "Dis-proportionality threshold 0.25"
    },
    {
      data: [4, 6, 3, 10, 2],
      label: "Dis-proportionality RoR 0.31"
    },
    {
      data: [3, 9, 2, 7, 5],
      label: "Pregnant Women"
    },
    {
      data: [2, 4, 5, 6, 8],
      label: "Cardiac Impairment"
    },
  ];
  public paeByFormulationLabels: any = ["Silodosin", "160970-54-7", "Rapaflo", "Urief", "Silodyx"];

  public significantFindings: any = [
    {
      studyId: "SIL-ST-09776",
      studyTitle: "The Effect of Traditional Chinese Medicine on Benign Prostatic Hyperplasia.",
      studyType: "Interventional (Clinical Trial)",
      location: "Taipei Veterans General Hospital Taipei, Taiwan",
      populationStudied: "Ages Eligible for Study: 50 Years to 70 Years (Adult, Older Adult); Sexes Eligible for Study: Male; Gender Based Eligibility: Yes; Accepts Healthy Volunteers: No;",
      studyStart: "August 31, 2017",
      status: "Completed on August 31, 2018"
    },
    {
      studyId: "SIL-ST-08777",
      studyTitle: "Efficacy of Silodosin in the Treatment of Symptomatic Benign Prostatic Hyperplasia (BPH).",
      studyType: "Interventional (Clinical Trial)",
      location: "Maidul islam Dhaka, Bangladesh",
      populationStudied: "Ages Eligible for Study: Child, Adult; Older Adult Sexes Eligible for Study: Male; Gender Based Eligibility: Yes; Gender Eligibility Description: Male patients who have been diagnosed with benign prostatic hyperplasia; Accepts Healthy Volunteers: No;",
      studyStart: "March 6, 2019",
      status: "Completed on January 2, 2020"
    },
    {
      studyId: "SIL-ST-06478",
      studyTitle: "Comparison Between Alpha Blocker Monotherapy and 5ARI Monotherapy Following Combination Therapy in Benign Prostatic Hyperplasia (BPH).",
      studyType: "Interventional (Clinical Trial)",
      location: "Seoul, Korea",
      populationStudied: "Ages Eligible for Study: 45 Years and older (Adult, Older Adult); Sexes Eligible for Study: Male; Accepts Healthy Volunteers:  No;",
      studyStart: "Jan-11",
      status: "Completed on December 2013"
    },
    {
      studyId: "SIL-ST-09791",
      studyTitle: "Effectiveness and Safety of Silodosin in the Treatment of Benign Prostatic Hyperplasia (SiRE).",
      studyType: "Interventional (Clinical Trial)",
      location: "Vita e Salute University, Department of Urology, Istituto Scientifico Ospedale San Raffaele Milan, Italy, 20132",
      populationStudied: "Ages Eligible for Study: 60 Years and older (Adult, Older Adult); Sexes Eligible for Study: Male; Accepts Healthy Volunteers:  No;",
      studyStart: "May-11",
      status: "Completed on August 2013"
    },
    {
      studyId: "SIL-ST-09364",
      studyTitle: "Study of a α1A Adrenoceptor Selective Antagonist Silodosin to Treat Severe Benign Prostatic Hyperplasia(BPH) (STRONG).",
      studyType: "Interventional (Clinical Trial)",
      location: "Seoul national university hospital Seoul, Korea, Republic of Korea",
      populationStudied: "Ages Eligible for Study: 50 Years and older (Adult, Older Adult); Sexes Eligible for Study: Male; Accepts Healthy Volunteers:  No;",
      studyStart: "Dec-10",
      status: "Completed on September 2011"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
