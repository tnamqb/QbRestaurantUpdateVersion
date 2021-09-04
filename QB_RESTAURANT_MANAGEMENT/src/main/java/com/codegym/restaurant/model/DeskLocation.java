package com.codegym.restaurant.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table (name = "deskLocations")
public class DeskLocation {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Long deskLocationId;
	
	@Column (nullable = false)
	@Size (min = 1, max = 100)
	private String deskLocationName;
	
//	@OneToMany(targetEntity = Desk.class, fetch = FetchType.EAGER)
//	private Set<Desk> desks;
}
