package com.lawyeredup.model;
import jakarta.persistence.*;
@Entity
public class Lawyer {
 @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
 private String name;
 private String specialization;
 private String location;
 private int experience;
 private double rating;
 private boolean proBono;

 public Long getId(){return id;}
 public String getName(){return name;}
 public void setName(String n){name=n;}
 public String getSpecialization(){return specialization;}
 public void setSpecialization(String s){specialization=s;}
 public String getLocation(){return location;}
 public void setLocation(String l){location=l;}
 public int getExperience(){return experience;}
 public void setExperience(int e){experience=e;}
 public double getRating(){return rating;}
 public void setRating(double r){rating=r;}
 public boolean isProBono(){return proBono;}
 public void setProBono(boolean p){proBono=p;}
}
