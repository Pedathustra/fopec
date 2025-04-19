if exists(select * from sys.procedures where name = 'insCompanyLocation')
begin
	drop proc insCompanyLocation;
end
go

create proc insCompanyLocation
	@company_id int,
	@address_id
as 
	set nocount on;

 

go