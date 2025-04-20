use fopec
go

 
if exists(select * from sys.procedures where name = 'getAddressesByCompanyId')
begin 
	drop proc getAddressesByCompanyId;
end 
go

create proc getAddressesByCompanyId
	@companyId int
as
begin
	set nocount on;
	select	a.id
		,	a.line1
		,	a.line2
		,	a.city
		,	a.state
		,	a.zip
		,	cl.isHQ
	from address a
		join company_location cl on a.id = cl.company_id
	where cl.company_id = @companyId 
				
	;
end 
go 

