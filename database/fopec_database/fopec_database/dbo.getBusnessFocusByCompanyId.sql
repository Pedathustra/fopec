use fopec
go

 
if exists(select * from sys.procedures where name = 'getBusinessFocusesByCompanyId')
begin 
	drop proc getBusinessFocusesByCompanyId;
end 
go

create proc getBusinessFocusesByCompanyId 
	@company_id int
as
begin
	
	select	bf.id,
			bf.[description]
	from business_focus bf
		join company_business_focus cbf on bf.id = cbf.business_focus_id
	where cbf.company_id = @company_id
 
	
end
go 


--exec getBusinessFocusesByCompanyId 57

