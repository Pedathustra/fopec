use fopec
go

if exists(select * from sys.procedures where name = 'getCompanies')
begin 
	drop proc getCompanies;
end 
go

create proc getCompanies 
as
begin
	set nocount on;
	select	id
		,	name
		,	created
		,	last_updated
	from company;
end 
go 

exec getCompanies;