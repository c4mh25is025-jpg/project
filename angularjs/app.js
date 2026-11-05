(function () {
  'use strict';

  angular.module('employeeDirectory', []).controller('DirectoryController', function ($scope, $filter) {
    $scope.departments = ['Executive', 'Engineering', 'Product & Design', 'Global Operations', 'Finance & Legal', 'Sales & Marketing'];
    $scope.locations = ['London, UK', 'New York, NY', 'San Francisco, CA'];
    $scope.statuses = ['Active', 'On Leave', 'Pending Review', 'Inactive'];
    $scope.filters = { department: '', location: '', status: '' };
    $scope.searchText = '';
    $scope.viewMode = 'cards';
    $scope.sortKey = 'name';
    $scope.sortDescending = false;
    $scope.isFormOpen = false;
    $scope.selectedEmployee = null;

    $scope.employees = [
      { id: 'EMP-001', name: 'Sarah Jenkins', title: 'Chief Executive Officer', department: 'Executive', team: 'Executive Leadership', email: 'sarah.jenkins@enterprise.internal', location: 'San Francisco, CA', timezone: 'PST (UTC-8)', managerName: '', status: 'Active', employmentType: 'Executive', hireDate: '2018-01-10' },
      { id: 'EMP-002', name: 'Marcus Vance', title: 'VP of Engineering & Technology', department: 'Engineering', team: 'Technical Leadership', email: 'marcus.vance@enterprise.internal', location: 'San Francisco, CA', timezone: 'PST (UTC-8)', managerName: 'Sarah Jenkins', status: 'Active', employmentType: 'Executive', hireDate: '2018-09-01' },
      { id: 'EMP-003', name: 'Elena Rostova', title: 'VP of Product & Experience', department: 'Product & Design', team: 'Product Leadership', email: 'elena.rostova@enterprise.internal', location: 'New York, NY', timezone: 'EST (UTC-5)', managerName: 'Sarah Jenkins', status: 'Active', employmentType: 'Executive', hireDate: '2019-04-15' },
      { id: 'EMP-004', name: 'David Henderson', title: 'Director of Global Operations', department: 'Global Operations', team: 'Operations Core', email: 'david.henderson@enterprise.internal', location: 'London, UK', timezone: 'GMT (UTC+0)', managerName: 'Sarah Jenkins', status: 'Active', employmentType: 'Full-time', hireDate: '2019-11-04' },
      { id: 'EMP-005', name: 'Victoria Sterling', title: 'VP of Finance & Chief Legal Officer', department: 'Finance & Legal', team: 'Executive Legal & Treasury', email: 'victoria.sterling@enterprise.internal', location: 'San Francisco, CA', timezone: 'PST (UTC-8)', managerName: 'Sarah Jenkins', status: 'Active', employmentType: 'Executive', hireDate: '2018-05-20' },
      { id: 'EMP-006', name: 'David Chen', title: 'Director of Cloud Infrastructure', department: 'Engineering', team: 'Infrastructure & SRE', email: 'david.chen@enterprise.internal', location: 'San Francisco, CA', timezone: 'PST (UTC-8)', managerName: 'Marcus Vance', status: 'Active', employmentType: 'Full-time', hireDate: '2020-02-15' },
      { id: 'EMP-007', name: 'Rachel Zhao', title: 'Director of Core Platform Software', department: 'Engineering', team: 'Platform Engineering', email: 'rachel.zhao@enterprise.internal', location: 'San Francisco, CA', timezone: 'PST (UTC-8)', managerName: 'Marcus Vance', status: 'Active', employmentType: 'Full-time', hireDate: '2020-06-10' },
      { id: 'EMP-008', name: 'Maya Lin', title: 'Staff Site Reliability Engineer', department: 'Engineering', team: 'Infrastructure & SRE', email: 'maya.lin@enterprise.internal', location: 'San Francisco, CA', timezone: 'PST (UTC-8)', managerName: 'David Chen', status: 'Active', employmentType: 'Full-time', hireDate: '2021-03-22' }
    ];

    function updateVisibleEmployees() {
      var results = $filter('filter')($scope.employees, $scope.searchText);
      results = $filter('filter')(results, $scope.filters);
      $scope.visibleEmployees = $filter('orderBy')(results, $scope.sortKey, $scope.sortDescending);
    }

    $scope.$watchGroup(['searchText', 'filters.department', 'filters.location', 'filters.status', 'sortKey', 'sortDescending'], updateVisibleEmployees);
    $scope.$watchCollection('employees', updateVisibleEmployees);

    $scope.initials = function (name) {
      return name.split(/\s+/).map(function (part) { return part.charAt(0); }).slice(0, 2).join('').toUpperCase();
    };

    $scope.openProfile = function (employee) { $scope.selectedEmployee = employee; };
    $scope.closeProfile = function () { $scope.selectedEmployee = null; };

    $scope.openNewEmployee = function () {
      $scope.newEmployee = { name: '', title: '', email: '', department: $scope.departments[0], location: $scope.locations[0], employmentType: 'Full-time' };
      $scope.isFormOpen = true;
    };
    $scope.closeForm = function () { $scope.isFormOpen = false; };

    $scope.addEmployee = function () {
      var nextId = String($scope.employees.length + 1).padStart(3, '0');
      var employee = angular.copy($scope.newEmployee);
      employee.id = 'EMP-' + nextId;
      employee.team = employee.department;
      employee.timezone = 'Not specified';
      employee.managerName = '';
      employee.status = 'Active';
      employee.hireDate = new Date().toISOString().slice(0, 10);
      $scope.employees.push(employee);
      $scope.closeForm();
      $scope.clearFilters();
    };

    $scope.clearFilters = function () {
      $scope.searchText = '';
      $scope.filters = { department: '', location: '', status: '' };
    };

    $scope.exportCsv = function () {
      var rows = $scope.visibleEmployees || $scope.employees;
      var columns = ['id', 'name', 'title', 'department', 'team', 'email', 'location', 'status', 'employmentType', 'hireDate'];
      var csv = [columns.join(',')].concat(rows.map(function (employee) {
        return columns.map(function (key) {
          return '"' + String(employee[key] || '').replace(/"/g, '""') + '"';
        }).join(',');
      })).join('\r\n');
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      var link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'executive-enterprise-directory.csv';
      link.click();
      URL.revokeObjectURL(link.href);
    };
  });
}());
