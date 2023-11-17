import {Component, ViewChild, OnInit} from '@angular/core';
import {NgForm, FormGroup, FormControl, FormBuilder} from '@angular/forms';


@Component({
  selector: 'country',
  templateUrl: './country.component.html'
})
export class CountryComponent implements OnInit {

  title = 'Angular Select Options Example';
  // contactForm! means will be set later
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  country_name = "";
  set_country = "";

  countries = [
    {id: 1, name: "United States"},
    {id: 2, name: "Australia"},
    {id: 3, name: "Canada"},
    {id: 4, name: "Brazil"},
    {id: 5, name: "England"}
  ];


  ngOnInit() {

    this.contactForm = this.fb.group({
      country: [null]
    });

    this.setDefaults();

    this.contactForm.get("country")?.valueChanges
      .subscribe(f => {
        this.onCountryChanged(f);
      })
  }


  submit() {
    console.log("Form Submitted")
    console.log(this.contactForm.value)
  }

  setDefaults() {
    this.contactForm.get("country")?.patchValue(null);
  }

  onCountryChanged(value: String) {
    console.log('onCountryChanged')
    console.log(value)
  }

  addCountry() {
    const country = this.countries.find(el => el.name === this.country_name);
    if (!country) {
      let id = Math.max.apply(Math, this.countries.map(function (o) {
        return o.id;
      }))
      this.countries.push({id: id + 1, name: this.country_name})
      this.country_name = "";
    }
  }

  setCountry() {
    const country = this.countries.find(el => el.name === this.set_country);
    if (country) {
      this.contactForm.get("country")?.patchValue(country.id);
    }
  }
}
