use fopec
go

if exists(select * from sys.procedures where name = 'getOwnershipType')
begin 
	drop proc getOwnershipType;
end 
go

create proc getOwnershipType 
as
begin
	set nocount on;
	select id, description from ownership_type;
end 
go 

exec getOwnershipType;