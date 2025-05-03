use fopec
go

 
if exists(select * from sys.procedures where name = 'getBusinessFocuses')
begin 
	drop proc getBusinessFocuses;
end 
go

create proc getBusinessFocuses 
as
begin
	
	select	bf.id,
			bf.[description]
	from business_focus bf
	;
 
	
end
go 


--exec getBusinessFocusesByCompanyId 57

