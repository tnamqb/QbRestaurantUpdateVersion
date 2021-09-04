package com.codegym.restaurant.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping
public class CalendarController {

    @GetMapping("/calendar")
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ModelAndView calendar() {
        return new ModelAndView("/dashboard/calendar");
    }
}
